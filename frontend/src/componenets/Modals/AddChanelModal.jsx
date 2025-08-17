import { useEffect, useRef } from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import store from '../../slices/store';
import { selectToken } from '../../slices/autxSlice';
import routes from '../../routes';
import * as Yup from 'yup';

const AddChanelModal = ({ show, setShow, listNamesChannels, setIsHost }) => {
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current?.focus()
    })

    const validationSchema = Yup.object().shape({
        body: Yup.string()
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .required('Обязательное поле')
            .notOneOf(listNamesChannels, 'Должно быть уникальным')
    });

    const dispatch = useDispatch();
    const closeButton = () => setShow(false);

    const formik = useFormik({
        initialValues: { body: '' },
        validationSchema,
        onSubmit: ({ body }) => {
            const token = selectToken(store.getState())
            const newChannel = { name: body }
            setIsHost(true)
            axios.post(routes.channels.allChannels(), newChannel, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    formik.resetForm()
                    setShow(false)

                })
                .catch((e) => {
                     console.log(e)
                     setIsHost(false) 
                    })
        },

    })

    // const addChannelFormSocket = (payload) => {
    //     const { id } = payload
    //     dispatch(addChannel(payload))
    //     setActiveChannel(id)
    // }

    // useEffect(() => {
    //     socket.on('newChannel', addChannelFormSocket);
    //     return () => socket.off('newChannel', addChannelFormSocket)
    // })

    return (
        <Modal show={show} onHide={closeButton}>
            <Modal.Header closeButton >
                <Modal.Title>Add</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <FormControl
                            required
                            ref={inputRef}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.body}
                            name="body"
                            className={`${formik.touched.body && formik.errors.body ? 'is-invalid' : ''}`}
                        />
                        <input type="submit" className="btn btn-primary mt-2 " value="submit" disabled={formik.isSubmitting} />
                        {formik.touched.body && formik.errors.body ? (
                            <div style={{ color: 'red' }} className='invalid-feedback'>{formik.errors.body}</div>
                        ) : null}
                    </FormGroup>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default AddChanelModal