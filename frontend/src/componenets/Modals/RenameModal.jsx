import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik';
const RenameModal = ({ show, setShow, indexChannel }) => {
    const closeButton = () => setShow(false)
    

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        onSubmit: ({ body }) => {
            console.log(indexChannel, body)

            // formik.formik.resetForm();
            closeButton();
        },
    });
    const handleCloseModal = () =>{
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
