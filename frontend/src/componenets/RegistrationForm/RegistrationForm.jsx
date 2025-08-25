import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import routes from '../../routes'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUsersData } from '../../slices/autxSlice'
import { useTranslation } from 'react-i18next'
import store from '../../slices/store'
import { selectErrorNetworks, setErrorNetwork, clearErrorNetwork } from '../../slices/errorsNetworkSlice'
import { ToastContainer, toast } from 'react-toastify'
import { useRef, useEffect } from 'react'

const RegistrationForm = () => {
  console.log('registartion')
  const inputUsernameRef = useRef(null)
  useEffect(() => {
    console.log(inputUsernameRef.current.value)
  }, [])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errors.tooMin'))
      .max(20, t('errors.tooMax'))
      .required(t('errors.requiredField')),
    password: Yup.string()
      .min(6, t('errors.tooMinSix'))
      .required(t('errors.requiredField')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('errors.samePassword'))
      .required(t('errors.requiredField')),
  })

  return (

    <div className="flex-grow-1 align-self-stretch ">
      <h1>{t('phrase.registration')}</h1>
      <Formik initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        const { username, password, confirmPassword } = values

        dispatch(clearErrorNetwork())
        setStatus(null)
        try {
          const responce = await axios.post(routes.signup(), { username, password })
          if (responce.status === 201) {
            console.log('login')
            localStorage.setItem('userId', JSON.stringify(responce.data))
            const { token, username } = responce.data
            dispatch(setUsersData(({ username, token })))
            navigate('/')
          }
        }
        catch (e) {
          if (e.status === 409) {
            dispatch(setErrorNetwork({ error: 'errors.existOnListUser' }))
          }
          else if (e.code === 'ERR_NETWORK') {
            dispatch(setErrorNetwork({ error: 'errors.network' }))
          }
          else (dispatch(setErrorNetwork({ error: 'errors.unknow' })))
        }
        finally {
          const { error } = selectErrorNetworks(store.getState())
          if (error) {
            toast.error(t(error), {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            })
          }
          setStatus(error)
          setSubmitting(false)
        }
      }}
      >
        {({ isSubmitting, status, errors, touched, setStatus }) => (
          <Form>
            <div className="input-group has-validation">
              <div className="form-floating mb-3">
                <Field
                  className={`form-control mb-3${(touched.username && errors.username) || status ? ' is-invalid' : ''}`}
                  type="username"
                  name="username"
                  id="username"
                  placeholder={t('phrase.userName')}
                  ref={inputUsernameRef}
                  validate={() => {
                    setStatus(null)
                  }}

                />
                <label className="form-label" htmlFor="username">{t('phrase.userName')}</label>
                <ErrorMessage name="username">{msg => <div className="invalid-tooltip">{msg}</div>}</ErrorMessage>
                {!(touched.username && errors.username) && status && <div className="invalid-tooltip">{t(status)}</div>}
              </div>
            </div>
            <div className="input-group has-validation">
              <div className="form-floating mb-3">
                <Field
                  className={`form-control mb-3${touched.password && errors.password ? ' is-invalid' : ''}`}
                  type="password"
                  name="password"
                  placeholder={t('phrase.password')}
                  id="password"
                />
                <label className="form-label" htmlFor="password">{t('phrase.password')}</label>
                <ErrorMessage name="password">{msg => <div className="invalid-tooltip">{msg}</div>}</ErrorMessage>
              </div>
            </div>
            <div className="input-group has-validation">
              <div className="form-floating mb-3">
                <Field
                  className={`form-control mb-3${touched.confirmPassword && errors.confirmPassword ? ' is-invalid' : ''}`}
                  type="password"
                  name="confirmPassword"
                  placeholder={t('errors.confirmPassword')}
                  id="confirmPassword"
                />
                <label className="form-label" htmlFor="confirmPassword">{t('errors.confirmPassword')}</label>
                <ErrorMessage name="confirmPassword">{msg => <div className="invalid-tooltip">{msg}</div>}</ErrorMessage>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-primary w-100 rounded-1" disabled={isSubmitting}> {isSubmitting ? `${t('phrase.registration')}...` : t('phrase.register')}</button>
          </Form>
        )}

      </Formik>
      <ToastContainer />
    </div>

  )
}

export default RegistrationForm
