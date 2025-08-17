import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios'
import routes from '../../routes'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsersData } from '../../slices/autxSlice';

const RegistrationForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .required('Обязательное поле'),
        password: Yup.string()
            .min(6, 'Не менее 6 символов')
            .required('Обязательное поле'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
            .required('Подтвердите пароль')
    })


    return (

        <div className='flex-grow-1 align-self-stretch '>
            <h1>Регистрация</h1>
            <Formik initialValues={{
                username: '',
                password: '',
                confirmPassword: ''
            }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                    const { username, password, confirmPassword } = values;
                    setStatus(null)
                    try {
                        const responce = await axios.post(routes.signup(), { username, password })
                        console.log('responce:',responce)
                        if (responce.status === 201) {
                            console.log('login')
                            localStorage.setItem('userId', JSON.stringify(responce.data))
                            const {token, username} = responce.data;
                            dispatch(setUsersData(({ username, token })))
                            navigate('/')
                        }
                    } catch (e) {
                        console.log(e)
                        if (e.status === 409) {
                            setStatus('Такой пользователь уже существует')
                        } else if( e.code === "ERR_NETWORK"){
                             setStatus('Ошибка сети')
                        } else( setStatus('Неизвестная ошибка'))

                        // toast.dismiss()
                        // toast.error('Неверные имя пользователя или пароль', {
                        //     position: "top-center",
                        //     autoClose: 5000,
                        //     hideProgressBar: false,
                        //     closeOnClick: false,
                        //     pauseOnHover: true,
                        //     draggable: true,
                        //     progress: undefined,
                        //     theme: "light",
                        // });
                    } finally {
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
                                    placeholder='Имя пользователя'
                                />
                                <ErrorMessage name='username'>{msg => <div className='invalid-tooltip'>{msg}</div>}</ErrorMessage>
                                      {status && <div className='invalid-tooltip'>{status}</div>}
                            </div>
                            <div className="input-group has-validation">
                                <Field
                                    className={`form-control mb-3${touched.password && errors.password ? ' is-invalid' : ''}`}
                                    type='password'
                                    name='password'
                                    placeholder='Пароль'
                                />
                                <ErrorMessage name='password'>{msg => <div className='invalid-tooltip'>{msg}</div>}</ErrorMessage>
                            </div>
                            <div className="input-group has-validation">
                                <Field
                                    className={`form-control mb-3${touched.confirmPassword && errors.confirmPassword ? ' is-invalid' : ''}`}
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Подтвердите пароль'
                                />
                                <ErrorMessage name='confirmPassword'>{msg => <div className='invalid-tooltip'>{msg}</div>}</ErrorMessage>
                          
                            </div>
                            <button type="submit" className="btn btn-outline-primary w-100 rounded-1" disabled={isSubmitting}> {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}</button>
                   
                    </Form>

                )}

            </Formik>

        </div>

    )
}

export default RegistrationForm