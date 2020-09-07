import React, { useState } from 'react'

import {Field, Form, withFormik, ErrorMessage, FormikValues} from "formik";
import * as Yup from "yup";
import validator from 'validator'
import MaskedInput from 'react-maskedinput'

const Wizard2 = ({ previousStep, setCurrentStep, data, setData }) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [errorPhoneNum, setErrorPhoneNum] = useState('')

    const onPreviousStep = () => {
        setCurrentStep(0)
        previousStep()
    }

    const onPhoneNumberChange = ({ target }) => {
        setData({...data, phone: target.value})
        // setPhoneNumber(target.value)
        if (
            !validator.isMobilePhone(target.value,'en-US')
        ) {
            setErrorPhoneNum('Please enter valid phone number')
        } else {
            setErrorPhoneNum('')
        }
    }

    const onCheck = () => {
        setErrorPhoneNum('')
        if(!data.phone){
            setErrorPhoneNum('Required')
        }
    }

    return(
        // SECTION 2
        <Form style={{width: '100%'}}>
            <section>
                <div className='form-row'>
                    <label>Country *</label>
                    <br />
                    <Field
                        type='text'
                        name='country'
                        className='form-control'
                    />
                    <ErrorMessage
                        name={'country'}
                        className={'validation-error'}
                        component={'div'}
                    />
                </div>
                <div className='form-row'>
                    <label>Postcode / Zip *</label>
                    <Field
                        type='text'
                        name='postCode'
                        className='form-control'
                    />
                    <ErrorMessage
                        name={'postCode'}
                        className={'validation-error'}
                        component={'div'}
                    />
                </div>
                <div className='form-row form-group'>
                    <div className='form-holder'>
                        <label>Phone *</label>
                        <MaskedInput
                            type='text'
                            value={data.number}
                            className='form-control'
                            mask='\+\1 (111) 111-1111'
                            onChange={onPhoneNumberChange}
                            placeholder={`+1 (XXX) XXX-XXXX`}
                        />
                        {errorPhoneNum ? (
                            <div className='validation-error'>
                                {errorPhoneNum}
                            </div>
                        ) : null}
                    </div>
                    <div className='form-holder'>
                        <label>Email Address *</label>
                        <Field
                            type='email'
                            name='email'
                            className='form-control'
                        />
                        <ErrorMessage
                            name={'email'}
                            className={'validation-error'}
                            component={'div'}
                        />
                    </div>
                </div>
                <div
                    className='form-row'
                    style={{ marginBottom: '18px' }}>
                    <label>Order Notes</label>
                    <Field
                        defaultValue={''}
                        name='commit'
                        className='form-control'
                        placeholder='Note about your order, eg. special notes fordelivery.'
                        style={{ height: '149px' }}
                    />
                    <ErrorMessage
                        name={'commit'}
                        component={'div'}
                        className={'validation-error'}
                    />
                </div>
                <div className='actions'>
                    <ul role='menu' aria-label='Pagination'>
                        <li
                            aria-disabled='false'
                            onClick={onPreviousStep}>
                            <a role='menuitem'>
                                Previous
                            </a>
                        </li>
                        <li 
                            aria-hidden='false'
                            aria-disabled='false'
                            onClick={onCheck}
                        >
                            {errorPhoneNum ? (
                                <a role='menuitem'>
                                    Next
                                </a>
                            ) : (
                                <button type='submit' style={{background: 'none'}}>
                                    <a role='menuitem'>
                                        Next
                                    </a>
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </section>
        </Form>
    )
}

const Wizard2Form = withFormik<any, any>({
    validationSchema: () => Yup.object().shape({
        country: Yup.string()
            .min(3)
            .required('Required'),
        postCode: Yup.string()
            .min(3)
            .max(12)
            .required('Required'),
        email: Yup.string()
            .min(3)
            .required('Required'),
        commit: Yup.string()
            .min(3),
        
    }),
    mapPropsToValues: (props) => {
        return ({
            country: '',
            postCode: '',
            email: '',
            commit: '',
        })
    },
    handleSubmit: (values, {props, setSubmitting, resetForm}) => {
        if(props.data.phone !== ''){
            console.log('2 values: ', values)
            const { country, postCode, email, commit } = values
            props.setData({
                ...props.data,
                country,
                postCode,
                email,
                commit
            })
            props.setCurrentStep(2)
            props.nextStep()
        }
    }
})(Wizard2)

export default Wizard2Form