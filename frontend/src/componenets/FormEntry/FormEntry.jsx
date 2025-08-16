import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsersData } from '../../slices/autxSlice';
import { ToastContainer, toast } from 'react-toastify';

const FormEntry = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    return (

        <div className='flex-grow-1 align-self-stretch '>
            <h1>Войти</h1>
            <Formik initialValues={{
                username: '',
                password: ''
            }}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                    const { username, password } = values;
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
                        // if(responce.status ===)
                    } catch (e) {
                        console.log(e)
                        if (e.status === 401) {
                            setStatus('Неверные имя пользователя или пароль')

                        } else if(e.code === "ERR_NETWORK"){ 
                            setStatus('Ошибка сети')
                        } else {
                            setStatus('Неизветсная ошибка')
                        }
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
                {({ isSubmitting, status }) => (
                    <Form>
                        <Field
                            className={`form-control mb-3${status ? ' is-invalid' : ''}`}
                            type='username'
                            name='username'
                            placeholder='Ваш ник'
                        />
                        <div className="input-group has-validation">
                            <Field
                                className={`form-control mb-3${status ? ' is-invalid' : ''}`}
                                type='password'
                                name='password'
                                placeholder='Пароль'
                            />
                            {status && <div className='invalid-tooltip'>{status}</div>}

                            <button type="submit" className="btn btn-outline-primary w-100 rounded-1" disabled={isSubmitting}> {isSubmitting ? 'Вход...' : 'Войти'}</button>
                        </div>
                    </Form>

                )}

            </Formik>

        </div>

    )
}

export default FormEntry