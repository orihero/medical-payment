import React, { useEffect } from 'react'

import MaskedInput from 'react-maskedinput';
import { useFormik } from "formik";
import * as Yup from "yup";

let Wizard1 = ({
    data,
    setData,
    nextStep,
    previousStep,
    setCurrentStep
}) => {

    useEffect(() => {
        formik.setValues({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            address1: data.address1 || '',
            address2: data.address2 || '',
            townCity: data.townCity || '',
            dateOfBirth: data.dateOfBirth || ''
        })
    }, [data])

    const onPreviousStep = () => {
        setCurrentStep(0)
        previousStep()
    }

    let formik = useFormik({
        initialValues: {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            address1: data.address1 || '',
            address2: data.address2 || '',
            townCity: data.townCity || '',
            dateOfBirth: data.dateOfBirth || ''
        },
        validationSchema: () => Yup.object().shape({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            address1: Yup.string().required('Required'),
            address2: Yup.string().required('Required'),
            townCity: Yup.string().required('Required'),
            dateOfBirth: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            const {
                firstName,
                lastName,
                address1,
                address2,
                townCity,
                dateOfBirth,
            } = values

            setData({
                ...data,
                firstName,
                lastName,
                address1,
                address2,
                townCity,
                dateOfBirth
            })

            setCurrentStep(2)
            nextStep()
        },
    })

    return (
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <section>
                <div className='form-row form-group'>
                    <div className='form-holder'>
                        <label>First Name *</label>
                        <input
                            type='text'
                            name={'firstName'}
                            className='form-control'
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div className='validation-error'>{formik.errors.firstName}</div>
                        ) : null}
                    </div>
                    <div className='form-holder'>
                        <label>Last Name *</label>
                        <input
                            type='text'
                            name={'lastName'}
                            className='form-control'
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className='validation-error'>{formik.errors.lastName}</div>
                        ) : null}
                    </div>
                </div>
                <div className='form-row'>
                    <label>Date of birth *</label>
                    <MaskedInput
                        type='text'
                        name={'dateOfBirth'}
                        className='form-control'
                        onChange={formik.handleChange}
                        value={formik.values.dateOfBirth}
                        mask='11-11-1111'
                        placeholder={`DD-MM-YYYY`}
                    />
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                        <div className='validation-error'>{formik.errors.dateOfBirth}</div>
                    ) : null}
                </div>
                <div className='form-row'>
                    <label>Address *</label>
                    <input
                        type='text'
                        name={'address1'}
                        className='form-control'
                        placeholder='Street address'
                        onChange={formik.handleChange}
                        value={formik.values.address1}
                    />
                    {formik.touched.address1 && formik.errors.address1 ? (
                        <div className='validation-error'>{formik.errors.address1}</div>
                    ) : null}
                    <input
                        type='text'
                        name={'address2'}
                        className='form-control'
                        style={{ marginTop: '20px' }}
                        placeholder='Apartment, suite, unit etc. (optional)'
                        onChange={formik.handleChange}
                        value={formik.values.address2}
                    />
                    {formik.touched.address2 && formik.errors.address2 ? (
                        <div className='validation-error'>{formik.errors.address2}</div>
                    ) : null}
                </div>
                <div className='form-row'>
                    <label>Town / City *</label>
                    <input
                        type='text'
                        name={'townCity'}
                        className='form-control'
                        onChange={formik.handleChange}
                        value={formik.values.townCity}
                    />
                    {formik.touched.townCity && formik.errors.townCity ? (
                        <div className='validation-error'>{formik.errors.townCity}</div>
                    ) : null}
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
                        >
                            <button type='submit' style={{ background: 'none' }}>
                                <a role='menuitem'>
                                    Next
                                </a>
                            </button>
                        </li>
                    </ul>
                </div>
            </section>
        </form>
    )
}

export default Wizard1