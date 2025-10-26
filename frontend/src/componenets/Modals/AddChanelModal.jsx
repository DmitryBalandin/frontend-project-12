import { useEffect, useRef } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import store from '../../slices/store'
import { selectToken } from '../../slices/autxSlice'
import routes from '../../routes'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { selectErrorNetworks, setErrorNetwork, clearErrorNetwork } from '../../slices/errorsNetworkSlice'
import LeoProfanity from 'leo-profanity'
import { closeModal } from '../../slices/modalSlice'
import { selectors as selectorsChannels } from '../../slices/channelsSlice'

const AddChanelModal = ({data}) => {
  const { t } = useTranslation()
  const inputRef = useRef()
  const { isError, error } = selectErrorNetworks(store.getState())

  useEffect(() => {
    LeoProfanity.loadDictionary('en')
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  })
  const listNamesChannels = useSelector(state => selectorsChannels.selectAll(state))
        .map(({ name }) => name)


  const validationSchema = Yup.object().shape({
    body: Yup.string()
      .min(3, t('errors.tooMin'))
      .max(20, t('errors.tooMax'))
      .required(t('errors.requiredField'))
      .notOneOf(listNamesChannels, t('errors.existOnList')),
  })

  const dispatch = useDispatch()
  const closeButton = () => {
    dispatch(closeModal({type:'add'}))
    dispatch(clearErrorNetwork())
  }

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema,
    onSubmit: ({ body }, { setSubmitting }) => {
      dispatch(clearErrorNetwork())
      const token = selectToken(store.getState())
      const newChannel = { name: LeoProfanity.clean(body), }

      axios.post(routes.channels.allChannels(), newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
      
          formik.resetForm()
          dispatch(closeModal({type:'add'}))
        })
        .catch((e) => {
          if (e.code === 'ERR_NETWORK') {
            dispatch(setErrorNetwork({ error: 'errors.network' }))
          }
          else {
            dispatch(setErrorNetwork({ error: 'errors.unknow' }))
          }
        })
        .finally(() => setSubmitting(false))
    },

  })

  return (
    <Modal show onHide={closeButton} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{t('modalActionName.add')}</Modal.Title>
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
              className={`mb-3 ${(formik.touched.body && formik.errors.body) || isError ? 'is-invalid' : ''}`}
            />
            <div className="d-flex justify-content-end">
              <input className="btn btn-secondary  me-3" onClick={closeButton} value={t('buttonActionName.cancel')} type="button" />
              <input type="submit" id="name" className="btn btn-primary " value={t('buttonActionName.submit')} disabled={formik.isSubmitting} />
              <label htmlFor="name" className="visually-hidden">Имя канала</label>
            </div>
            {(formik.touched.body && formik.errors.body) || isError
              ? (
                  <div className="invalid-feedback">
                    {formik.errors.body || t(error)}
                  </div>
                )
              : null}
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AddChanelModal
