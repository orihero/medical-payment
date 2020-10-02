import React, { useState } from 'react';

import { Form } from 'react-bootstrap';
import MaskedInput from 'react-maskedinput';
import Cards from 'react-credit-cards';

enum Fields {
	cvc = 'cvc',
}

const Wizard3 = ({ data, setData, nextStep, setCurrentStep }) => {
	const [typeCont, setTypeCont] = useState(
		!data.isRealPayment ? true : false
	);

	const [card, setCard] = useState({
		cvc: data.cvc || '',
		expiry: data.expiry || '',
		focus: '' as Fields,
		name: data.cardOwner || '',
		number: data.cardNumber || '',
	});
	const [errorText, setErrorText] = useState({
		cvc: '',
		expiry: '',
		focus: '',
		name: '',
		number: '',
		last: '',
	});
	const [insuranceNumber, setInsuranceNumber] = useState('')

	const handleInputFocus = (e: any) => {
		setCard({ ...card, focus: e.target.name });
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCard({ ...card, [name]: value });
	};

	const onCardChange = (e) => {
		if (e.issuer === 'unknown') {
			setErrorText({
				...errorText,
				number: 'Please enter valid card number',
			});
		} else {
			setErrorText({ ...errorText, number: '' });
		}
	};

	const onCardNumberChange = (e: any) => {
		let a = e.target.value;
		let str = a.slice(0, 4) + a.slice(5, 9) + a.slice(10, 14) + a.slice(15);
		setCard({ ...card, number: str });
	};

	const onExpiryChange = (e: any) => {
		let a = e.target.value.replace(/[^\d+]/g, '');
		if (
			parseInt(a.slice(0, 2)) < 1 ||
			parseInt(a.slice(0, 2)) > 12 ||
			parseInt(a.slice(2)) <=
				parseInt(new Date().getFullYear().toString().slice(2)) ||
			a.length < 4
		) {
			setErrorText({
				...errorText,
				expiry: 'Please enter valid expiry date. (month/year)',
			});
		} else {
			setErrorText({ ...errorText, expiry: '' });
		}
		setCard({ ...card, expiry: a });
	};

	const onCvcChange = (e: any) => {
		if (e.target.value.length < 3) {
			setErrorText({ ...errorText, cvc: 'Invalid cvc' });
		} else {
			setErrorText({ ...errorText, cvc: '' });
		}
		setCard({ ...card, cvc: e.target.value.replace(/[^\d+]/g, '') });
	};

	const [files, setFiles] = useState({
		insurancePhoto: data.insurancePhoto || null,
		stateId: data.stateId || null,
	});

	const onSelectedFileChange = (e, isFirst) => {
		if (isFirst) {
			setFiles({ ...files, insurancePhoto: e.target.files[0] });
		} else {
			setFiles({ ...files, stateId: e.target.files[0] });
		}
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		setErrorText({ ...errorText, last: '' });

		if (typeCont) {
			const { stateId, insurancePhoto } = files;

			if (insurancePhoto && stateId) {
				setData({
					...data,
					cvc: '',
					expiry: '',
					cardNumber: '',
					cardOwner: '',
					stateId,
					insurancePhoto,
					isRealPayment: 0,
				});

				setCurrentStep(1);
				nextStep();
			} else {
				setErrorText({
					...errorText,
					last: 'Make sure you selected all fields with files',
				});
			}
		} else {
			const { cvc, expiry, name, number } = card;
			const {
				cvc: cvcError,
				name: nameError,
				expiry: expiryError,
				number: numberError,
			} = errorText;

			if (
				cvc === '' ||
				expiry === '' ||
				name === '' ||
				number === '' ||
				cvcError ||
				expiryError ||
				parseInt(number).toString().length !== 16 ||
				numberError ||
				nameError
			) {
				setErrorText({
					...errorText,
					last: 'Make sure you filled all fields correctly',
				});
			} else {
				setData({
					...data,
					stateId: null,
					insurancePhoto: null,
					cvc,
					expiry,
					cardOwner: name,
					isRealPayment: 1,
					cardNumber: number,
				});

				setCurrentStep(1);
				nextStep();
			}
		}
	};

	return (
		// SECTION 3
		<section>
			<div id='PaymentForm'>
				<div className='checkbox--row--title'>Payment Type</div>
				<div className='flex--row' style={{ marginBottom: '2em' }}>
					<div
						className='checkbox--row'
						onClick={() => setTypeCont(false)}>
						<input
							id='biir'
							name='biir'
							type='checkbox'
							checked={!typeCont ? true : false}
						/>
						<label htmlFor='biir'>Card payment</label>
					</div>
					<div
						className='checkbox--row'
						style={{ marginLeft: '2em' }}
						onClick={() => setTypeCont(true)}>
						<input
							id='ikkii'
							name='ikkii'
							type='checkbox'
							checked={typeCont ? true : false}
						/>
						<label htmlFor='ikkii'>Insurance</label>
					</div>
				</div>
				{typeCont ? (
					<div style={{ width: '35vw' }}>
						<label htmlFor='custom-file-1'>
							{files.insurancePhoto
								? 'Picture of State ID selected'
								: 'Picture of State ID'}
						</label>
						<Form>
							<Form.File
								custom
								id='custom-file-1'
								accept='.png, .jpg, .jpeg'
								onChange={(e) => onSelectedFileChange(e, true)}
								label={
									files.insurancePhoto
										? 'File Selected'
										: 'Choose file'
								}
							/>
						</Form>
						<label
							htmlFor='custom-file-2'
							style={{ marginTop: '2em' }}
						>
							{files.stateId
								? 'Picture of Insurance selected'
								: 'Picture of Insurance'}
						</label>
						<Form>
							<Form.File
								custom
								id='custom-file-2'
								accept='.png, .jpg, .jpeg'
								onChange={(e) => onSelectedFileChange(e, false)}
								label={
									files.stateId
										? 'File Selected'
										: 'Choose file'
								}
							/>
						</Form>
						<label
							htmlFor="insuranceNumber"
							style={{ marginTop: '2em' }}
						>
								Insurance number
						</label>
						<input
                            type='text'
							name={'firstName'}
                            className='form-control'
							style={{ width: '50%' }}
							value={insuranceNumber}
							onChange={e => setInsuranceNumber(e.target.value)}
                            // onChange={formik.handleChange}
                            // value={formik.values.firstName}
                        />
					</div>
				) : (
					<>
						<Cards
							cvc={card.cvc}
							expiry={card.expiry}
							name={card.name}
							focused={card.focus}
							number={card.number}
							callback={onCardChange}
						/>
						<form className='pt-10 customForm'>
							<div className='pt-10'>
								<div className='form-row'>
									<label>Card number *</label>
									<MaskedInput
										type='tel'
										name='number'
										value={card.number}
										className='form-control'
										onFocus={handleInputFocus}
										mask='1111-1111-1111-1111'
										onChange={onCardNumberChange}
										placeholder={`XXXX-XXXX-XXXX-XXXX`}
									/>
									{errorText.number ? (
										<div className='validation-error'>
											{errorText.number}
										</div>
									) : null}
								</div>
								<div className='form-row'>
									<label>Card owner *</label>
									<input
										type='text'
										name='name'
										className='form-control'
										value={card.name}
										onFocus={handleInputFocus}
										onChange={handleInputChange}
									/>
								</div>
								<div className='form-row form-group'>
									<div className='form-holder'>
										<label>Expiry *</label>
										<input
											type='tel'
											name='expiry'
											maxLength={4}
											value={card.expiry}
											className='form-control'
											onFocus={handleInputFocus}
											onChange={onExpiryChange}
										/>
										{errorText.expiry ? (
											<div className='validation-error'>
												{errorText.expiry}
											</div>
										) : null}
									</div>
									<div className='form-holder'>
										<label>CVV *</label>
										<input
											type='text'
											name='cvc'
											maxLength={3}
											value={card.cvc}
											onChange={onCvcChange}
											className='form-control'
											onFocus={handleInputFocus}
										/>
										{errorText.cvc ? (
											<div className='validation-error'>
												{errorText.cvc}
											</div>
										) : null}
									</div>
								</div>
							</div>
						</form>
					</>
				)}
			</div>
			{errorText.last ? (
				<div className='validation-error' style={{ marginTop: '2em' }}>
					{errorText.last}
				</div>
			) : null}
			<div className='actions'>
				<ul role='menu' aria-label='Pagination'>
					<li aria-disabled='true'>
						<a href='#previous' role='menuitem'>
							Previous
						</a>
					</li>
					<li aria-hidden='true'>
						<a role='menuitem' onClick={onSubmit}>
							Next
						</a>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default Wizard3;
