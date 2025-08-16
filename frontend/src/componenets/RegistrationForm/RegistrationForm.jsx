import { Formik, Form, Field, ErrorMessage } from 'formik';
 import * as Yup from "yup";

const RegistrationForm = () => {
    
    const validationSchema = Yup.object().shape({
        username:Yup.string()
        .min(3,'Too small')
        .max(20,'Too long')
        .required('NecessarFiled')
    })

   
    return (

        <div className='flex-grow-1 align-self-stretch '>
            <h1>Регистрация</h1>
            <Formik initialValues={{
                username: '',
                password: '',
                confirmPassword:''
            }}
            validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                    const { username, password, confirmPassword } = values;
                    try {
                        console.log(username,password,confirmPassword)
                        // const responce = await axios.post('./api/v1/login', {
                        //     username,
                        //     password
                        // })
                        // if (responce.status === 200) {
                        //     localStorage.setItem('userId', JSON.stringify(responce.data))
                        //     const {token, username} = responce.data;
                        //     dispatch(setUsersData(({ username, token })))
                        //     navigate('/')
                        // }

                    } catch (e) {
                        setStatus('Неверные имя пользователя или пароль')
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
                {({ isSubmitting, status,errors, touched }) => (
                    <Form>
                         <div className="input-group has-validation">
                        <Field
                            className={`form-control mb-3${touched.username && errors.username? ' is-invalid' : ''}`}
                            type='username'
                            name='username'
                            placeholder='Имя пользователя'
                        />
                        <ErrorMessage name='username'>{msg => <div className='invalid-tooltip'>{msg}</div>}</ErrorMessage>
                        </div>
                        <Field
                            className={`form-control mb-3${status ? ' is-invalid' : ''}`}
                            type='password'
                            name='password'
                            placeholder='Пароль'
                        />
                        <div className="input-group has-validation">
                         <Field
                            className={`form-control mb-3${status ? ' is-invalid' : ''}`}
                            type='password'
                            name='confirmPassword'
                            placeholder='Подтвердите пароль'
                        />
                       {status && <div className='invalid-tooltip'>{status}</div>}
                       
                        <button type="submit" className="btn btn-outline-primary w-100 rounded-1" disabled={isSubmitting}> {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}</button>
                        </div>
                    </Form>

                )}

            </Formik>

        </div>

    )
}

export default RegistrationForm