import { Modal, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import store from '../../slices/store';
import { useEffect, useRef } from 'react';
import socket from '../../socket';
import { selectToken } from '../../slices/autxSlice';
import { removeChannel } from '../../slices/channelsSlice';
import { useDispatch } from 'react-redux';
import routes from '../../routes';



const RemoveModal = ({ show, setShow, indexModal, activeChannel, setActiveChannel }) => {
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current?.focus()
  })

  const formik = useFormik({
    initialValues:'',
    onSubmit: () => {
      const token = selectToken(store.getState());

      axios.delete(routes.channels.channelId(indexModal), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch(e => console.log(e));

    }
  })

  const closeButton = () => setShow(false);
  const dispatch = useDispatch();


  const removeChannelFromStore = (payload) => {
    const { id } = payload;
    dispatch(removeChannel(id));
    closeButton();
    console.log(activeChannel, id)
    if (activeChannel === id) {
      setActiveChannel('1')
    }
  }

  useEffect(() => {
    socket.on('removeChannel', removeChannelFromStore)
    return () => socket.off('removeChannel', removeChannelFromStore)
  })

  return (
    <Modal show={show} onHide={closeButton}  >
      <Modal.Header closeButton>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group">
            <input className="btn btn-danger" type="submit" value="remove" ref={inputRef} />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  )
}
export default RemoveModal