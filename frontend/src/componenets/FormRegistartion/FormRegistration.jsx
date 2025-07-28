import { Formik, Form, Field } from 'formik';
import axios from 'axios';

const FormRegisrtation = () => {
    return (<div className='flex-grow-1 align-self-stretch '>
        <h1>Войти</h1>
        <Formik initialValues={{
            username: '',
            password: ''
        }}
            onSubmit={async ({ username, password }) => {
                console.log(username, password)
                try {
                    const responce = await axios.post('./api/v1/login', {
                        username,
                        password
                    })
                    console.log(username, password, responce);
                } catch (e) {
                    console.log(e)
                }

                
            }}
        >
            {() => (
                <Form>
                    <Field
                        className='form-control mb-3'
                        type='username'
                        name='username'
                    />
                    <Field
                        className='form-control mb-3'
                        type='password'
                        name='password'
                    />
                    <button type="submit" className="btn btn-outline-primary w-100">Войти</button>
                </Form>

            )}

        </Formik>

    </div>)
}

export default FormRegisrtation