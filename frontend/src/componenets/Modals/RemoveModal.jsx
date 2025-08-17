import { Modal, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import store from '../../slices/store';
import { useEffect, useRef } from 'react';
import { selectToken } from '../../slices/autxSlice';
import routes from '../../routes';



const RemoveModal = ({ show, setShow, indexModal }) => {
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current?.focus()
  })
  const closeButton = () => setShow(false);
  const formik = useFormik({
    initialValues: '',
    onSubmit: (values, { setSubmitting }) => {
      const token = selectToken(store.getState());
      inputRef.current.disabled
      axios.delete(routes.channels.channelId(indexModal), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        closeButton();
      }).catch(e => console.log(e))
        .finally(() => setSubmitting(false))
    }
  })




  return (
    <Modal show={show} onHide={closeButton}  >
      <Modal.Header closeButton>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='lead'>Уверены?</p>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group">
            <div className='d-flex justify-content-end'>
              <input className='btn btn-secondary  me-3' value="Отменить" type='button' onClick={closeButton}/>
              <input className="btn btn-danger" type="submit" value="remove" ref={inputRef} disabled={formik.isSubmitting} />
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  )
}
export default RemoveModal