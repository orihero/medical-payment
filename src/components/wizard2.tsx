import React, { useState, useEffect } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import validator from 'validator';
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

	const [modalShow, setModalShow] = useState(false);
	const [acceptChecked, setAcceptChecked] = useState(false);

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
			request_type,
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
		console.log('fmData: ', fmData);

		try {
			const response = await axios.post(
				'https://appointment.accureference.com/api/payment',
				fmData
			);

			if (response.data.status === 'error') {
				alert('Invalid credentials');
			} else if (
				response.data.type === 'error' &&
				response.data.data === 'Insufficient funds'
			) {
				alert(response.data.data);
			} else {
				setData({ ...initialState });
				window.location.reload();
				// goInitial()
			}
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

			<Modal show={modalShow} onHide={() => setModalShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Contract</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div>
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Soluta neque nobis ea laudantium? Minima nihil
						dicta voluptatum amet fugiat totam fugit, veritatis
						molestiae earum placeat quos non sunt numquam
						praesentium corrupti accusantium consequatur enim. Quia
						totam quas ipsam ea, nulla sequi consequuntur. Ex
						nostrum, molestias nisi iste eum a? Asperiores
						perspiciatis natus laboriosam dolor adipisci ducimus,
						labore minima eaque veritatis blanditiis ratione fugit,
						molestias at neque ab nihil repudiandae est dolorum
						dignissimos. Pariatur expedita vero placeat delectus
						temporibus necessitatibus assumenda! Rem molestiae odit
						optio minus blanditiis doloribus necessitatibus enim
						quis. Fuga asperiores recusandae eum sapiente tempora
						reiciendis soluta sint repellendus!
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
							onClick={onFinishClick}>
							Finish
						</button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Wizard2;
