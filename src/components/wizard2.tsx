import React, { useState, useEffect } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import validator from 'validator';
import MaskedInput from 'react-maskedinput';
import axios from 'axios'

import { formData } from '../utils'

const Wizard2 = ({
	data,
	setData,
	initialState,
	previousStep,
	setCurrentStep
}) => {
	const [errorText, setErrorText] = useState('')

	useEffect(() => {
		formik.setValues({
            country: data.country || '',
			postCode: data.postCode || '',
			email: data.email || '',
        })
	}, [data])

	const onPreviousStep = () => {
		setCurrentStep(1)
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
		onSubmit: async values => {
			if(!checkPhoneNumber()) {
				setErrorText('Please enter valid phone number')
			} else {
				setErrorText('')
				const { country, postCode, email } = values

				console.log('OK!')
				const {
					firstName,
					lastName,
					address1,
					address2,
					townCity,
					phone,
					cardNumber,
					cardOwner,
					expiry,
					cvc,
					isRealPayment,
					insurancePhoto,
					stateId,
					requestId,
				} = data

				let rawData: any = {
					firstname: firstName,
					lastname: lastName,
					address: `${address1} ${address2}`,
					city: townCity,
					postcode: postCode,
					phone,
					email,
					country: '1',
					isRealPayment,
					request_id: requestId,
					company_name: 'company_name',
					add_address: 'add_address',
				}

				if(isRealPayment){
					rawData = {
						...rawData,
						card_numer: cardNumber,
						card_owner: cardOwner,
						card_expiry: expiry,
						card_cvv: cvc,
					}
				} else {
					rawData = {
						...rawData,
						stateId,
						insurancePhoto,
					}
				}

				console.log('rawData: ', rawData)

				let fmData = formData(rawData)
				
				try {
					const response = await axios.post('https://appointment.accureference.com/api/payment', fmData)

					console.log('response: ', response)

				    if(response.data.status === 'error'){
				        alert('Invalid credentials')
				    } else if (response.data.type === 'error' && response.data.data === 'Insufficient funds'){
						alert(response.data.data)
					} else {
						setData({ ...initialState })
				        window.location.reload()
				        // goInitial()
				    }
				} catch(err){
					alert(`Error: ${err.toString()}`)
				    console.log('apiErr: ', err)
				}
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
							value={data.phone}
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
								<a role='menuitem'>Finish</a>
							</button>
						</li>
					</ul>
				</div>
			</section>
		</form>
	);
};

export default Wizard2;
