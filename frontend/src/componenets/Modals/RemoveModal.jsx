import { Modal, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import store from '../../slices/store';
import { useEffect, useRef } from 'react';
import { selectToken } from '../../slices/autxSlice';
import routes from '../../routes';
import { useTranslation } from 'react-i18next';


const RemoveModal = ({ show, setShow, indexModal }) => {
  const inputRef = useRef()
  const { t } = useTranslation();
  useEffect(() => {
    inputRef.current?.focus()
  })
  const closeButton = () => setShow(false);
  const formik = useFormik({
    initialValues:'',
    onSubmit: (values, { setSubmitting, setStatus}) => {
      const token = selectToken(store.getState());
      inputRef.current.disabled
      axios.delete(routes.channels.channelId(indexModal), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        closeButton();
      }).catch(e => {
        if (e.code === "ERR_NETWORK") {
          setStatus(t('errors.network'))
          
        } else {
          setStatus(t('errors.unknow'))
        }
      })
        .finally(() => setSubmitting(false))
    }
  })
  

  return (
    <Modal show={show} onHide={closeButton}  >
      <Modal.Header closeButton>
        <Modal.Title>{t('modalActionName.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='lead'>{t('phrase.remove')}</p>
        <form onSubmit={formik.handleSubmit} >
          <FormGroup className='mb-3 form-group'>
            <div className={`d-flex justify-content-end ${formik.status ? 'is-invalid' : ''}`}>
              <input className='btn btn-secondary  me-3' value={t('buttonActionName.cancel')} type='button' onClick={closeButton} />
              <input className="btn btn-danger" type="submit" value={t('buttonActionName.remove')} ref={inputRef} disabled={formik.isSubmitting} />
            </div>
            {formik.status  ? (
              <div className='invalid-feedback'>{formik.status}</div>
            ) : null}
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  )
}
export default RemoveModal