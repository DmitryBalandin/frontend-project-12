import { Modal, FormGroup } from 'react-bootstrap'
import axios from 'axios'
import { useFormik } from 'formik'
import store from '../../slices/store'
import { useEffect, useRef } from 'react'
import { selectToken } from '../../slices/autxSlice'
import routes from '../../routes'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectErrorNetworks, setErrorNetwork, clearErrorNetwork } from '../../slices/errorsNetworkSlice'

const RemoveModal = ({ show, setShow, indexModal, setIsHost }) => {
  const inputRef = useRef()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isError, error } = selectErrorNetworks(store.getState())

  useEffect(() => {
    inputRef.current?.focus()
  })
  const closeButton = () => {
    setShow(false)
    dispatch(clearErrorNetwork())
  }
  const formik = useFormik({
    initialValues: '',
    onSubmit: (values, { setSubmitting, setStatus }) => {
      dispatch(clearErrorNetwork())
      setStatus(false)
      const token = selectToken(store.getState())

      setIsHost(true)
      inputRef.current.disabled

      axios.delete(routes.channels.channelId(indexModal), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        closeButton()
      }).catch((e) => {
        if (e.code === 'ERR_NETWORK') {
          dispatch(setErrorNetwork({ error: 'errors.network' }))
        }
        else {
          dispatch(setErrorNetwork({ error: 'errors.unknow' }))
        }
        setIsHost(false)
      })
        .finally(() => setSubmitting(false))
    },
  })

  return (
    <Modal show={show} onHide={closeButton}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalActionName.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('phrase.remove')}</p>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-3 form-group">
            <div className={`d-flex justify-content-end ${formik.status || isError ? 'is-invalid' : ''}`}>
              <input className="btn btn-secondary  me-3" value={t('buttonActionName.cancel')} type="button" onClick={closeButton} />
              <button className="btn btn-danger" type="submit" ref={inputRef} disabled={formik.isSubmitting}>{t('buttonActionName.remove')}</button>

            </div>
            {formik.status || isError
              ? (
                <div className="invalid-feedback">
                  {formik.status || t(error)}
                </div>
              )
              : null}
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  )
}
export default RemoveModal
