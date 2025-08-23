import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios'
import routes from '../../routes'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsersData } from '../../slices/autxSlice';
import { useTranslation } from 'react-i18next';
import store from '../../slices/store';
import { selectErrorNetworks, setErrorNetwork, clearErrorNetwork } from '../../slices/errorsNetworkSlice';

const RegistrationForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, t('errors.tooMin'))
            .max(20, t('errors.tooMax'))
            .required(t('errors.requiredField')),
        password: Yup.string()
            .min(6, t('errors.tooMax'))
            .required(t('errors.requiredField')),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], t('errors.confirmPassword:'))
            .required(t('errors.samePassword'))
    })


    return (

        <div className='flex-grow-1 align-self-stretch '>
            <h1>{t('phrase.registration')}</h1>
            <Formik initialValues={{
                username: '',
                password: '',
                confirmPassword: ''
            }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                    const { username, password, confirmPassword } = values;
                    
                   dispatch(clearErrorNetwork())
                   setStatus(null)
                    try {
                        const responce = await axios.post(routes.signup(), { username, password })
                        if (responce.status === 201) {
                            console.log('login')
                            localStorage.setItem('userId', JSON.stringify(responce.data))
                            const { token, username } = responce.data;
                            dispatch(setUsersData(({ username, token })))
                            navigate('/')
                        }
                    } catch (e) {
                        if (e.status === 409) {
                            dispatch(setErrorNetwork({ error:'errors.existOnListUser'}))
                         
                        } else if (e.code === "ERR_NETWORK") {
                            dispatch(setErrorNetwork({ error:'errors.network'}))
                           
                        } else ( dispatch(setErrorNetwork({ error:'errors.unknow'})))


                    } finally {
                        const { error } = selectErrorNetworks(store.getState());
                        console.log(error)
                        setStatus(error)
                        setSubmitting(false);
                    }


                }}
            >
                {({ isSubmitting, status, errors, touched }) => (
                    <Form>
                        <div className="input-group has-validation">
                            <Field
                                className={`form-control mb-3${(touched.username && errors.username) || status ? ' is-invalid' : ''}`}
                                type='username'
                                name='username'
                                placeholder={t('phrase.userName')}
                            />
                            <ErrorMessage name='username'>{msg => <div className='invalid-tooltip'>{msg}</div>}</ErrorMessage>
                             {status && <div className='invalid-tooltip'>{t(status)}</div>}
                           
                        </div>
                        <div className="input-group has-validation">
                            <Field
                                className={`form-control mb-3${touched.password && errors.password ? ' is-invalid' : ''}`}
                                type='password'
                                name='password'
                                placeholder={t('phrase.password')}
                            />
                            <ErrorMessage name='password'>{msg => <div className='invalid-tooltip'>{msg}</div>}</ErrorMessage>
                        </div>
                        <div className="input-group has-validation">
                            <Field
                                className={`form-control mb-3${touched.confirmPassword && errors.confirmPassword ? ' is-invalid' : ''}`}
                                type='password'
                                name='confirmPassword'
                                placeholder={t('errors.requiredField')}
                            />
                            <ErrorMessage name='confirmPassword'>{msg => <div className='invalid-tooltip'>{msg}</div>}</ErrorMessage>
                        </div>
                        <button type="submit" className="btn btn-outline-primary w-100 rounded-1" disabled={isSubmitting}> {isSubmitting ? `${t('phrase.registration')}...` : t('phrase.register')}</button>
                    </Form>
                )}
            </Formik>

        </div>

    )
}

export default RegistrationForm