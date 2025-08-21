import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsersData } from '../../slices/autxSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { selectErrorNetworks, setErrorNetwork, clearErrorNetwork } from '../../slices/errorsNetworkSlice';
import store from '../../slices/store';

const FormEntry = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const { isError, error } = selectErrorNetworks(store.getState());
    

    return (

        <div className='flex-grow-1 align-self-stretch '>
            <h1>{t('phrase.entrance')}</h1>
            <Formik initialValues={{
                username: '',
                password: ''
            }}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                    const { username, password } = values;
                    dispatch(clearErrorNetwork())
                    try {
                        const responce = await axios.post('./api/v1/login', {
                            username,
                            password
                        })
                        if (responce.status === 200) {
                            localStorage.setItem('userId', JSON.stringify(responce.data))
                            const { token, username } = responce.data;
                            dispatch(setUsersData(({ username, token })))
                            navigate('/')
                        }
                    } catch (e) {
                        console.log(e)
                        if (e.status === 401) {
                            dispatch(setErrorNetwork({error:'errors.incorrectUserOrPassword'}))

                        } else if(e.code === "ERR_NETWORK"){ 
                            dispatch(setErrorNetwork({error:'errors.network'}))
                        } else {
                            dispatch(setErrorNetwork({error:'errors.unknow'}))
                        }
                      console.log(isError,error)
                    } finally {
                        setSubmitting(false);
                    }


                }}
            >
                {({ isSubmitting, status }) => (
                    <Form>
                        <Field
                            className={`form-control mb-3${isError ? ' is-invalid' : ''}`}
                            type='username'
                            name='username'
                            placeholder={t('phrase.username')}
                        />
                        <div className="input-group has-validation">
                            <Field
                                className={`form-control mb-3${isError ? ' is-invalid' : ''}`}
                                type='password'
                                name='password'
                                placeholder={t('phrase.password')}
                            />
                            {isError && <div className='invalid-tooltip'>{t(error)}</div>}

                            <button type="submit" className="btn btn-outline-primary w-100 rounded-1" disabled={isSubmitting}> {isSubmitting ? t('phrase.login') : t('phrase.entrance')}</button>
                        </div>
                    </Form>

                )}

            </Formik>

        </div>

    )
}

export default FormEntry