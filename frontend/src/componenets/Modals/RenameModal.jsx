import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import {  upsertChannel } from '../../slices/channelsSlice';
import socket from '../../socket';
import axios from 'axios';
import { selectToken } from '../../slices/autxSlice';
import store from '../../slices/store';
import routes from '../../routes';

const RenameModal = ({ show, setShow, indexChannel,setActiveChannel }) => {
    const closeButton = () => setShow(false)
    const dispatch = useDispatch()
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current?.focus()
    })
    const formik = useFormik({
        initialValues: {
            body: '',
        },
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
                            className="mb-3"
                            type="text"
                            name="body"
                            ref={inputRef}
                            onChange={formik.handleChange}
                            value={formik.values.body}
                            required />
                        <div className='d-flex justify-content-end'>
                            <input className='btn btn-secondary  me-3' onClick={handleCloseModal} value="Отменить" type='button' />
                            <input className="btn btn-primary " type="submit" value="Отправить" onClick={formik.handleSubmit} />
                        </div>
                    </FormGroup>
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default RenameModal
