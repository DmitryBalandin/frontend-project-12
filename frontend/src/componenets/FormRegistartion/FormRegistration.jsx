import { Formik, Form, Field } from 'formik';


const FormRegisrtation = () => {
    return (<div>
        <h1>Войти</h1>
        <Formik initialValues={{
            username: 'wwq',
            password: ''
        }}>
            {() => (
                <Form>
                    <Field
                    className='form-control mb-3'
                        type='username'
                        name='username'
                    />
                    <Field
                     className='form-control'
                        type='password'
                        name='password'
                    />
                </Form>
            )}

        </Formik>
    </div>)
}

export default FormRegisrtation