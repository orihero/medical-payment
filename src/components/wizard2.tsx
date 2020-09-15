import React, { useState } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import validator from 'validator';
import MaskedInput from 'react-maskedinput';

const Wizard2 = ({
	data,
	setData,
	nextStep,
	previousStep,
	setCurrentStep
}) => {
	const [errorText, setErrorText] = useState('')

	const onPreviousStep = () => {
		setCurrentStep(0)
		previousStep()
	}

	const onPhoneNumberChange = ({ target }) => {
		setData({ ...data, phone: target.value });
		if (!validator.isMobilePhone(target.value, 'en-US')) {
			setErrorText('Please enter valid phone number');
		} else {
			setErrorText('');
		}
	};

	const checkPhoneNumber = () => {
		let str = ''
		for (let i = 0; i < data.phone.length; i++){
			if(parseInt(data.phone[i])){
				str += parseInt(data.phone[i])
			}
		}
		if(str.toString().length === 11){
			return true
		} else {
			return false
		}
	}

	const formik = useFormik({
		initialValues: {
			country: data.country || '',
			postCode: data.postCode || '',
			email: data.email || '',
		},
		validationSchema: () => Yup.object().shape({
			country: Yup.string().required('Required'),
			postCode: Yup.string().min(3).max(12).required('Required'),
			email: Yup.string().required('Required'),
		}),
		onSubmit: values => {
			if(!checkPhoneNumber()) {
				setErrorText('Please enter valid phone number')
			} else {
				setErrorText('')
				const { country, postCode, email } = values

				setData({
					...data,
					country,
					postCode,
					email,
				})

				setCurrentStep(2)
				nextStep()
			}
		},
	})

	return (
		<form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
			<section>
				<div className='form-row'>
					<label>Country *</label>
					<br />
					<input
						type='text'
						name='country'
						className='form-control'
						value={formik.values.country}
						onChange={formik.handleChange}
					/>
					{formik.touched.country && formik.errors.country ? (
						<div className='validation-error'>{formik.errors.country}</div>
					) : null}
				</div>
				<div className='form-row'>
					<label>Postcode / Zip *</label>
					<input
						type='text'
						name='postCode'
						className='form-control'
						value={formik.values.postCode}
						onChange={formik.handleChange}
					/>
					{formik.touched.postCode && formik.errors.postCode ? (
						<div className='validation-error'>{formik.errors.postCode}</div>
					) : null}
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
						{errorText ? (
							<div className='validation-error'>
								{errorText}
							</div>
						) : null}
					</div>
					<div className='form-holder'>
						<label>Email Address *</label>
						<input
							type='email'
							name='email'
							className='form-control'
							value={formik.values.email}
							onChange={formik.handleChange}
						/>
						{formik.touched.email && formik.errors.email ? (
                            <div className='validation-error'>{formik.errors.email}</div>
                        ) : null}
					</div>
				</div>
				<div className='actions'>
					<ul role='menu' aria-label='Pagination'>
						<li aria-disabled='false' onClick={onPreviousStep}>
							<a role='menuitem'>Previous</a>
						</li>
						<li
							aria-hidden='false'
							aria-disabled='false'
						>
							<button
								type='submit'
								style={{ background: 'none' }}
							>
								<a role='menuitem'>Next</a>
							</button>
						</li>
					</ul>
				</div>
			</section>
		</form>
	);
};

export default Wizard2;
