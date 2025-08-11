import { useEffect, useRef } from 'react'
import axios from 'axios';
import { useFormik } from 'formik'
import socket from '../../socket'
import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import store from '../../slices/store';
import { selectToken } from '../../slices/autxSlice';
import { addChannel } from '../../slices/channelsSlice';


const AddChanelModal = ({ show, setShow, setActiveChannel }) => {

    const inputRef = useRef()
    useEffect(() => {
        inputRef.current?.focus()
    }, [show])

    const dispatch = useDispatch();
    const closeButton = () => setShow(false);


    const formik = useFormik({
        initialValues: { body: '' },
        onSubmit: ({ body }) => {
            const token = selectToken(store.getState())
            const newChannel = { name: body }

            axios.post('/api/v1/channels', newChannel, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).catch((e) => console.log(e))
        },

    })

    const addChannelFormSocket = (payload) => {
        const { id } = payload
        dispatch(addChannel(payload))
        setShow(false)
        setActiveChannel(id)
        formik.resetForm();
    }
    useEffect(() => {
        socket.on('newChannel', addChannelFormSocket);
        return () => socket.off('newChannel', addChannelFormSocket)
    })

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
                        />
                    </FormGroup>
                    <input type="submit" className="btn btn-primary mt-2" value="submit" />
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default AddChanelModal