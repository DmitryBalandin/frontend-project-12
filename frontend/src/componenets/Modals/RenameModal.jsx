import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { upsertChannel } from '../../slices/channelsSlice';
import * as Yup from 'yup';
import socket from '../../socket';
import axios from 'axios';
import { selectToken } from '../../slices/autxSlice';
import store from '../../slices/store';
import routes from '../../routes';
import { selectors as selectorsChannels } from '../../slices/channelsSlice';


const RenameModal = ({ show, setShow, indexChannel, setActiveChannel,listNamesChannels }) => {
    const closeButton = () => setShow(false)
    const dispatch = useDispatch()
    const inputRef = useRef()
    const { name: nameRenamingChannel } = useSelector(state => selectorsChannels.selectById(state, indexChannel))

    useEffect(() => {
        inputRef.current.value = nameRenamingChannel
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    },[show])

  const validationSchema = Yup.object().shape({
        body: Yup.string()
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .required('Обязательное поле')
            .notOneOf(listNamesChannels,'Должно быть уникальным')
    });

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema,
        onSubmit: ({ body }) => {
            const editerChannel = { name: body };
            const token = selectToken(store.getState());
            axios.patch(routes.channels.channelId(indexChannel), editerChannel, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).catch((e) => console.log(e))
        },
    });



    const renameChannelFromSocket = (payload) => {
        dispatch(upsertChannel(payload))
        formik.resetForm();
        setShow(false);
        setActiveChannel(indexChannel)
    }

    useEffect(() => {
        socket.on('renameChannel', renameChannelFromSocket);
        return () => socket.off('renameChannel', renameChannelFromSocket)
    })
    const handleCloseModal = () => {
        closeButton();
        formik.resetForm();
    }

    return (
        <Modal show={show} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Rename</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit} >
                    <FormGroup >
                        <FormControl
                            className={`mb-3 ${formik.touched.body && formik.errors.body ? 'is-invalid':''}`}
                            type="text"
                            name="body"
                            ref={inputRef}
                            onChange={formik.handleChange}
                            value={formik.values.body}
                            required 
                            />
                        <div className='d-flex justify-content-end'>
                            <input className='btn btn-secondary  me-3' onClick={handleCloseModal} value="Отменить" type='button' />
                            <input className="btn btn-primary " type="submit" value="Отправить" onClick={formik.handleSubmit} disabled={formik.isSubmitting} />
                        </div>
                         {formik.touched.body && formik.errors.body ? (
                            <div style={{color: 'red'}} className='invalid-feedback'>{formik.errors.body}</div>
                        ) : null}
                    </FormGroup>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default RenameModal
