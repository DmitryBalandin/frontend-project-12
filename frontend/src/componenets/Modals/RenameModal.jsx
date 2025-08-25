import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import axios from 'axios'
import { selectToken } from '../../slices/autxSlice'
import store from '../../slices/store'
import routes from '../../routes'
import { selectors as selectorsChannels } from '../../slices/channelsSlice'
import { useTranslation } from 'react-i18next'
import { selectErrorNetworks, setErrorNetwork, clearErrorNetwork } from '../../slices/errorsNetworkSlice'

const RenameModal = ({ show, setShow, indexChannel, listNamesChannels, setIsHost }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isError, error } = selectErrorNetworks(store.getState())

  const closeButton = () => {
    setShow(false)
    dispatch(clearErrorNetwork())
  }
  const inputRef = useRef()
  const { name: nameRenamingChannel } = useSelector(state => selectorsChannels.selectById(state, indexChannel))

  useEffect(() => {
    inputRef.current.value = nameRenamingChannel
    inputRef.current?.focus()
    inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
  }, [show])

  const validationSchema = Yup.object().shape({
    body: Yup.string()
      .min(3, () => t('errors.tooMin'))
      .max(20, () => t('errors.tooMax'))
      .required(() => t('errors.requiredField'))
      .notOneOf(listNamesChannels, () => t('errors.existOnList')),
  })

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: ({ body }, { setSubmitting }) => {
      const editerChannel = { name: body }
      const token = selectToken(store.getState())
      setIsHost(true)
      dispatch(clearErrorNetwork())
      axios.patch(routes.channels.channelId(indexChannel), editerChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        formik.resetForm()
        setShow(false)
      })
        .catch((e) => {
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

  const handleCloseModal = () => {
    closeButton()
    formik.resetForm()
  }

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalActionName.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className={`mb-3 ${(formik.touched.body && formik.errors.body) || isError ? 'is-invalid' : ''}`}
              type="text"
              name="body"
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.body}
              required
              id="name"
            />
            <label htmlFor="name" className="visually-hidden">Имя канала</label>
            <div className="d-flex justify-content-end">
              <input className="btn btn-secondary  me-3" onClick={handleCloseModal} value={t('buttonActionName.cancel')} type="button" />
              <input className="btn btn-primary " type="submit" value={t('buttonActionName.submit')} onClick={formik.handleSubmit} disabled={formik.isSubmitting} />

            </div>
            {(formik.touched.body && formik.errors.body) || isError ?
              (<div className="invalid-feedback">
                {formik.errors.body || t(error)}
              </div>
              ) :
              null}
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default RenameModal
