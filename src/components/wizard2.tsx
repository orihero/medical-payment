import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import validator from 'validator';
import MaskedInput from 'react-maskedinput';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import { formData } from '../utils';

const Wizard2 = ({
	data,
	setData,
	initialState,
	previousStep,
	setCurrentStep,
}) => {
	const [errorText, setErrorText] = useState('');

	const [acceptChecked, setAcceptChecked] = useState(false);

	const [modalShow, setModalShow] = useState(false);
	const [errModalShow, setErrModalShow] = useState(false)

	useEffect(() => {
		formik.setValues({
			country: data.country || '',
			postCode: data.postCode || '',
			email: data.email || '',
		});
	}, [data]);

	const onPreviousStep = () => {
		setCurrentStep(1);
		previousStep();
	};

	const onPhoneNumberChange = ({ target }) => {
		setData({ ...data, phone: target.value });
		// if (!validator.isMobilePhone(target.value, 'any')) {
		// 	setErrorText('Please enter valid phone number');
		// } else {
		// 	setErrorText('');
		// }
	};

	const checkPhoneNumber = () => {
		let str = '';
		for (let i = 0; i < data.phone.length; i++) {
			if (parseInt(data.phone[i])) {
				str += parseInt(data.phone[i]);
			}
		}
		if (str.toString().length === 11) {
			return true;
		} else {
			return false;
		}
	};

	const formik = useFormik({
		initialValues: {
			country: data.country || '',
			postCode: data.postCode || '',
			email: data.email || '',
		},
		validationSchema: () =>
			Yup.object().shape({
				country: Yup.string().required('Required'),
				postCode: Yup.string().min(3).max(12).required('Required'),
				email: Yup.string().required('Required'),
			}),
		onSubmit: async (values) => {
			// if (!checkPhoneNumber()) {
			// 	setErrorText('Please enter valid phone number');
			setErrorText('');
			const { postCode, email } = values;

			setData({
				...data,
				postCode,
				email,
			});
			setModalShow(true);
		},
	});

	const onFinishClick = async () => {
		const {
			firstName,
			lastName,
			address1,
			address2,
			townCity,
			phone,
			email,
			postCode,
			cardNumber,
			cardOwner,
			expiry,
			cvc,
			isRealPayment,
			insurancePhoto,
			stateId,
			requestId,
			request_type,
		} = data;

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
			request_type: request_type === 2 ? 1 : 0,
		};

		if (isRealPayment) {
			rawData = {
				...rawData,
				card_numer: cardNumber,
				card_owner: cardOwner,
				card_expiry: expiry,
				card_cvv: cvc,
			};
		} else {
			rawData = {
				...rawData,
				stateId,
				insurancePhoto,
			};
		}

		let fmData = formData(rawData);

		console.log('rawData: ', rawData);

		try {
			const response = await axios.post(
				'https://appointment.accureference.com/api/payment',
				fmData
			);
			
			setModalShow(false)
			console.log('response (f): ', response)

			if(response.data.type === 'error'){
				setErrModalShow(true)
			}

			// if (response.data.status === 'error') {
			// 	alert('Invalid credentials');
			// } else if (
			// 	response.data.type === 'error' &&
			// 	response.data.data === 'Insufficient funds'
			// ) {
			// 	alert(response.data.data);
			// } else {
			// 	setData({ ...initialState });
			// 	window.location.reload();
			// 	// goInitial()
			// }
		} catch (err) {
			alert(`Error: ${err.toString()}`);
			console.log('apiErr: ', err);
		}
	};

	return (
		<>
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
							<div className='validation-error'>
								{formik.errors.country}
							</div>
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
							<div className='validation-error'>
								{formik.errors.postCode}
							</div>
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
								<div className='validation-error'>
									{formik.errors.email}
								</div>
							) : null}
						</div>
					</div>
					<div className='actions'>
						<ul role='menu' aria-label='Pagination'>
							<li aria-disabled='false' onClick={onPreviousStep}>
								<a role='menuitem'>Previous</a>
							</li>
							<li aria-hidden='false' aria-disabled='false'>
								<button
									type='submit'
									style={{ background: 'none' }}>
									<a role='menuitem'>Finish</a>
								</button>
							</li>
						</ul>
					</div>
				</section>
			</form>

			<Modal show={errModalShow} onHide={() => setErrModalShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Error: Invalid credentials</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className='err-btn-box'>
						<button
							onClick={() => window.location.reload()}
							className='err-btn-green'
						>
							Retry
						</button>
						<Link
							to='/'
							className='err-btn-red'
						>
							Without Payment
						</Link>
					</div>
				</Modal.Body>
			</Modal>

			<Modal show={modalShow} onHide={() => setModalShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Disclaimer</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div>
						<p style={{marginBottom: '10px'}}>
							{`Total sum ${data.request_type === 2 ? '60$' : '10$'}`}
						</p>
						The Company shall provide COVID testing for those
						Travellers identified by Pure Health and shall provide
						test results in accordance with the workflow and TAT
						herein agreed. The Traveller shall be notified by the
						Company as to a patient service centre location where
						the Traveller may obtain COVID testing. In compliance
						with local laws, Company may require that Travellers
						provide an order for COVID testing from an authorized
						medical practitioner prior to performing a COVID test.
						Pure Health will collect a fee of Five USD (5.00 USD)
						from the Travellers needing a testing order. This fee is
						collected by Pure Health on behalf of the ordering
						practitioner. Pure Health will transmit this fee to
						Company for Company to transmit to the ordering
						practitioner, without setoff or deduction by either
						party.
					</div>
					<div className='modal--bottom--box'>
						<div onClick={() => setAcceptChecked(!acceptChecked)}>
							<input
								id='accept'
								name='accept'
								type='checkbox'
								checked={acceptChecked}
							/>
							<label htmlFor='accept'>Accept</label>
						</div>
						<button
							style={{ border: 'none', outline: 'none' }}
							disabled={!acceptChecked}
							className={`${
								acceptChecked ? 'active--button' : ''
							}`}
							onClick={onFinishClick}>
							Accept and Sign
						</button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Wizard2;
