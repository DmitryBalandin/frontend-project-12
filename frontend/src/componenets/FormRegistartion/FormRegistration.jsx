import { Formik, Form, Field } from 'formik';


const FormRegisrtation = () => {
    return (<div className='flex-grow-1 align-self-stretch '>
        <h1>Войти</h1>
        <Formik initialValues={{
            username: '',
            password: ''
        }}
        onSubmit={values => {
         // same shape as initial values
         console.log(values);
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
                    <button type="submit" class="btn btn-outline-primary w-100">Войти</button>
                </Form>
                
            )}
            
        </Formik>
        
    </div>)
}

export default FormRegisrtation