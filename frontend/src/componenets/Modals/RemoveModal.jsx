import {Modal, FormGroup} from 'react-bootstrap';


const Remove = ({show, setShow, indexModal}) =>{
  const closeButton = () => setShow(false)
  return (
    <Modal show={show} onHide={closeButton} >
      <Modal.Header closeButton>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup className="form-group" >
          <input className="btn btn-danger" type="submit" value="remove" onClick={() =>console.log('remove')}  />
        </FormGroup>
      </Modal.Body>
    </Modal>
  )
}
export default Remove