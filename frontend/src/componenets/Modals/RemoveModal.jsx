import { Modal, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import store from '../../slices/store';
import { useEffect } from 'react';
import socket from '../../socket';
import { selectToken } from '../../slices/autxSlice';
import { removeChannel } from '../../slices/channelsSlice';
import { useDispatch } from 'react-redux';



const RemoveModal = ({ show, setShow, indexModal }) => {

  const closeButton = () => setShow(false);
  const dispatch = useDispatch();
  const removeChannelFromServer = () => {
    const token = selectToken(store.getState());

    axios.delete(`/api/v1/channels/${indexModal}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(e => console.log(e));
  }

  const removeChannelFromStore = (payload) => {
    const {id} = payload;
    dispatch(removeChannel(id));
    closeButton(); 
  }

  useEffect(() => {
    socket.on('removeChannel', removeChannelFromStore)
    return () => socket.off('removeChannel', removeChannelFromStore)
  })

  return (
    <Modal show={show} onHide={closeButton} >
      <Modal.Header closeButton>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup className="form-group" >
          <input className="btn btn-danger" type="submit" value="remove" onClick={removeChannelFromServer} />
        </FormGroup>
      </Modal.Body>
    </Modal>
  )
}
export default RemoveModal