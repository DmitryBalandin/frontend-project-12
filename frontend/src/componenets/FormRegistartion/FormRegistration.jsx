import { Formik, Form, Field} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsersData } from '../../slices/autxSlice';
import { ToastContainer, toast } from 'react-toastify';

const FormRegisrtation = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (

        <div className='flex-grow-1 align-self-stretch '>
            <h1>Войти</h1>
            <Formik initialValues={{
                username: '',
                password: ''
            }}
                onSubmit={async (values, { setSubmitting }) => {
                    const { username, password } = values;
                    try {
                        const responce = await axios.post('./api/v1/login', {
                            username,
                            password
                        })
                        if (responce.status === 200) {
                            localStorage.setItem('userId', JSON.stringify(responce.data))
                            const token = responce.data;
                            dispatch(setUsersData(({ username, token })))
                            navigate('/')
                        }

                    } catch (e) {

                        toast.dismiss()
                        toast.error('Неверные имя пользователя или пароль', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    } finally {
                        setSubmitting(false);
                    }


                }}
            >
                {({ isSubmitting}) => (
                    <Form>
                        <Field
                            className={`form-control mb-3${status ? ' is-invalid' : ''}`}
                            type='username'
                            name='username'
                        />
                        <Field
                            className={`form-control mb-3${status ? ' is-invalid' : ''}`}
                            type='password'
                            name='password'
                        />
                        <ToastContainer />
                        <button type="submit" className="btn btn-outline-primary w-100" disabled={isSubmitting}> {isSubmitting ? 'Вход...' : 'Войти'}</button>
                    </Form>

                )}

            </Formik>

        </div>

    )
}

export default FormRegisrtation