import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUsersData } from '../../slices/autxSlice'
import { ToastContainer, toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { selectErrorNetworks, setErrorNetwork, clearErrorNetwork } from '../../slices/errorsNetworkSlice'
import store from '../../slices/store'

const FormEntry = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  return (

    <div className='flex-grow-1 align-self-stretch '>
      <h1>{t('phrase.entrance')}</h1>
      <Formik initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        const { username, password } = values
        dispatch(clearErrorNetwork())
        setStatus(null)
        try {
          const responce = await axios.post('./api/v1/login', {
            username,
            password,
          })
          if (responce.status === 200) {
            localStorage.setItem('userId', JSON.stringify(responce.data))
            const { token, username } = responce.data
            dispatch(setUsersData(({ username, token })))
            navigate('/')
          }
        } catch (e) {
          if (e.status === 401) {
            dispatch(setErrorNetwork({ error: 'errors.incorrectUserOrPassword' }))
          } else if (e.code === 'ERR_NETWORK') {
            dispatch(setErrorNetwork({ error: 'errors.network' }))
          } else {
            dispatch(setErrorNetwork({ error: 'errors.unknow' }))
          }
          const { error } = selectErrorNetworks(store.getState())
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
          setStatus(error)
        } finally {
          setSubmitting(false)
        }
      }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div className="form-floating mb-3">
              <Field
                className={`form-control mb-3${status ? ' is-invalid' : ''}`}
                type='username'
                name='username'
                placeholder={t('phrase.username')}
                id='username'
              />
              <label className='form-label' htmlFor="username">{t('phrase.username')}</label>
            </div>
            <div className="input-group has-validation">
              <div className="form-floating mb-3">
                <Field
                  className={`form-control mb-3${status ? ' is-invalid' : ''}`}
                  type='password'
                  name='password'
                  placeholder={t('phrase.password')}
                  id='password'
                />
                {status && <div className='invalid-tooltip'>{t(status)}</div>}
                <label className='form-label' htmlFor="password">{t('phrase.password')}</label>
              </div>
              <button type="submit" className="btn btn-outline-primary w-100 rounded-1" disabled={isSubmitting}> {isSubmitting ? t('phrase.login') : t('phrase.entrance')}</button>
            </div>
          </Form>

        )}

      </Formik>
      <ToastContainer />
    </div>

  )
}

export default FormEntry
