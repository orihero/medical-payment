import React from 'react'

import {Field, Form, withFormik, ErrorMessage, FormikValues} from "formik";
import * as Yup from "yup";

let Wizard1 = ({ data, setData }) => {

    return(
        // SECTION 1
        <Form style={{width: '100%'}}>
            <section>
                <div className='form-row form-group'>
                    <div className='form-holder'>
                        <label>First Name *</label>
                        <Field
                            type='text'
                            name={'firstName'}
                            className='form-control'
                        />
                        <ErrorMessage name={'firstName'} className={'validation-error'} component={'div'}/>
                    </div>
                    <div className='form-holder'>
                        <label>Last Name *</label>
                        <Field
                            type='text'
                            name={'lastName'}
                            className='form-control'
                        />
                        <ErrorMessage name={'lastName'} className={'validation-error'} component={'div'}/>
                    </div>
                </div>
                <div className='form-row'>
                    <label>Address *</label>
                    <Field
                        type='text'
                        name={'address1'}
                        className='form-control'
                        placeholder='Street address'
                    />
                    <ErrorMessage
                        name={'address1'}
                        component={'div'}
                        className={'validation-error'}
                    />
                    <Field
                        type='text'
                        name={'address2'}
                        className='form-control'
                        style={{ marginTop: '20px' }}
                        placeholder='Apartment, suite, unit etc. (optional)'
                    />
                    <ErrorMessage name={'address2'} className={'validation-error'} component={'div'}/>
                </div>
                <div className='form-row'>
                    <label>Town / City *</label>
                    <Field
                        type='text'
                        name={'townCity'}
                        className='form-control'
                    />
                    <ErrorMessage name={'townCity'} className={'validation-error'} component={'div'}/>
                </div>
                <div className='actions'>
                    <ul role='menu' aria-label='Pagination'>
                        <li aria-disabled='true'>
                            <a href='#previous' role='menuitem'>
                                Previous
                            </a>
                        </li>
                        <li 
                            aria-hidden='false'
                            aria-disabled='false'
                        >
                            <button type='submit' style={{background: 'none'}}>
                                <a role='menuitem'>
                                    Next
                                </a>
                            </button>
                        </li>
                    </ul>
                </div>
            </section>
        </Form>
    )
}

const Wizard1Form = withFormik<any, any>({
    validationSchema: () => Yup.object().shape({
        firstName: Yup.string()
            .min(3)
            .required('Required'),
        lastName: Yup.string()
            .min(3)
            .required('Required'),
        address1: Yup.string()
            .min(3)
            .required('Required'),
        address2: Yup.string()
            .min(3)
            .required('Required'),
        townCity: Yup.string()
            .min(3)
            .required('Required'),
    }),
    mapPropsToValues: (props) => {
        return ({
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            townCity: ''
        })
    },
    handleSubmit: (values, {props, setSubmitting, resetForm}) => {
        console.log('1 values: ', values)
        const { firstName, lastName, address1, address2, townCity } = values
        props.setData({
            ...props.data,
            firstName,
            lastName,
            address1,
            address2,
            townCity,
        })
        props.setCurrentStep(1)
        props.nextStep()
    }
})(Wizard1)

export default Wizard1Form