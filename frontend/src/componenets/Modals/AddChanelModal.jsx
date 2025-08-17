import { useEffect, useRef } from 'react'
import axios from 'axios';
import { useFormik, ErrorMessage } from 'formik'
import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import store from '../../slices/store';
import { selectToken } from '../../slices/autxSlice';
import routes from '../../routes';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';


const AddChanelModal = ({ show, setShow, listNamesChannels, setIsHost }) => {
    const { t } = useTranslation();
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current?.focus()
    })

    const validationSchema = Yup.object().shape({
        body: Yup.string()
            .min(3, () => t('errors.tooMin'))
            .max(20, () => t('errors.tooMax'))
            .required(() => t('errors.requiredField'))
            .notOneOf(listNamesChannels, () => t('errors.existOnList'))
    });

    const dispatch = useDispatch();
    const closeButton = () => setShow(false);

    const formik = useFormik({
        initialValues: { body: '' },
        validationSchema,
        onSubmit: ({ body }, { setStatus }) => {
            const token = selectToken(store.getState())
            const newChannel = { name: body }
            setIsHost(true)
            axios.post(routes.channels.allChannels(), newChannel, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    formik.resetForm()
                    setShow(false)

                })
                .catch((e) => {
                    if (e.code === "ERR_NETWORK") {
                        formik.errors.body = 'Ошибка сети'
                    } else {
                        setStatus('Неизветсная ошибка')
                    }
                    setIsHost(false)
                })
        },

    })


    return (
        <Modal show={show} onHide={closeButton}>
            <Modal.Header closeButton >
                <Modal.Title>Add</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <FormControl
                            required
                            ref={inputRef}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.body}
                            name="body"
                            className={`${formik.touched.body && formik.errors.body ? 'is-invalid' : ''} mb-3`}
                        />
                        <div className='d-flex justify-content-end'>
                            <input className='btn btn-secondary  me-3' onClick={closeButton} value="Отменить" type='button' />
                            <input type="submit" className="btn btn-primary  " value="submit" disabled={formik.isSubmitting} />
                            {/* <ErrorMessage name="body">{msg => <div className='invalid-feedback'>{msg}</div>}</ErrorMessage> */}
                            {formik.touched.body && formik.errors.body ? (
                                <div style={{ color: 'red' }} className='invalid-feedback'>{formik.errors.body}</div>
                            ) : null}
                        </div>
                    </FormGroup>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default AddChanelModal