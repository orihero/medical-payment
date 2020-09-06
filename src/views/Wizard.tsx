import React, { useState } from 'react';
//@ts-ignore
import Cards from 'react-credit-cards';
import '../App.css';
import 'react-credit-cards/es/styles-compiled.css';
import StepWizard from 'react-step-wizard';

enum Fields {
	cvc = 'cvc',
}

function Wizard(props) {
	const [wizard, setWizard] = useState();
	const [currentStep, setCurrentStep] = useState(0);

	const nextStep = () => {
		wizard.nextStep();
		setCurrentStep(currentStep + 1);
	};

	const goToStep = (index) => {
		wizard.goToStep(index + 1);
		setCurrentStep(index);
	};

	const goPreviousStep = () => {
		wizard.previousStep();
		setCurrentStep(currentStep - 1);
	};

	const [card, setCard] = useState({
		cvc: '',
		expiry: '',
		focus: '' as Fields,
		name: '',
		number: '',
	});

	let handleInputFocus = (e: any) => {
		console.log({ e });
		setCard({ ...card, focus: e.target.name });
	};

	let handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log({ e });

		const { name, value } = e.target;
		setCard({ ...card, [name]: value });
	};

	let onCardChange = (e) => {
		console.log(e);
	};

	// @ts-ignore
	return (
		<div className='wrapper'>
			<div className='image-holder'>
				<img src='./assets/images/logo-blue.png' alt='' />
			</div>
			<div id='wizard' style={{ overflow: 'hidden' }}>
				<div className={'steps'}>
					<ul className={`step-${currentStep + 1}`}>
						{[...new Array(3)].map((item, index) => {
							return (
								<li
									onClick={() => goToStep(index)}
									className={`${index === 0 && 'first'} ${
										index === 2 && 'last'
									} ${currentStep >= index && 'checked'}`}>
									<a href='#'>
										<span />
									</a>
								</li>
							);
						})}
					</ul>
				</div>
				<StepWizard
					instance={(wizardInstance) => setWizard(wizardInstance)}>
					{/* SECTION 1 */}
					<section>
						<div className='form-row form-group'>
							<div className='form-holder'>
								<label>First Name *</label>
								<input
									type='text'
									onChange={() => console.log('LOL')}
									className='form-control'
								/>
							</div>
							<div className='form-holder'>
								<label>Last Name *</label>
								<input type='text' className='form-control' />
							</div>
						</div>
						<div className='form-row'>
							<label>Company Name</label>
							<input type='text' className='form-control' />
						</div>
						{/* <div className='form-row'>
							<label>Country *</label>
							<div className='form-holder'>
								<select className='form-control'>
									<option value='viet nam' className='option'>
										Viet Nam
									</option>
									<option
										value='united states'
										className='option'>
										United States
									</option>
									<option
										value='united kingdom'
										className='option'>
										United Kingdom
									</option>
								</select>
								<i className='zmdi zmdi-caret-down' />
							</div>
						</div> */}
						<div className='form-row'>
							<label>Address *</label>
							<input
								type='text'
								className='form-control'
								placeholder='Street address'
								style={{ marginBottom: '20px' }}
							/>
							<input
								type='text'
								className='form-control'
								placeholder='Apartment, suite, unit etc. (optional)'
							/>
						</div>
						<div className='form-row'>
							<label>Town / City *</label>
							<input type='text' className='form-control' />
						</div>
					</section>
					{/* SECTION 2 */}
					<section>
						<div className='form-row'>
							<label>Country *</label>
							<br />
							<input type='text' className='form-control' />
						</div>
						<div className='form-row'>
							<label>Postcode / Zip *</label>
							<input type='text' className='form-control' />
						</div>
						<div className='form-row form-group'>
							<div className='form-holder'>
								<label>Phone *</label>
								<input type='text' className='form-control' />
							</div>
							<div className='form-holder'>
								<label>Email Address *</label>
								<input type='text' className='form-control' />
							</div>
						</div>
						<div
							className='form-row'
							style={{ marginBottom: '18px' }}>
							<label>Order Notes</label>
							<textarea
								className='form-control'
								placeholder='Note about your order, eg. special notes fordelivery.'
								style={{ height: '149px' }}
								defaultValue={''}
							/>
						</div>
						<div className='checkbox'>
							<label>
								<input type='checkbox' /> Create an account?
								<span className='checkmark' />
							</label>
						</div>
					</section>
					{/* SECTION 3 */}
					<section>
						<div id='PaymentForm'>
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
										<input
											type='tel'
											className='form-control'
											name='number'
											onFocus={handleInputFocus}
											onChange={handleInputChange}
										/>
									</div>
									<div className='form-row'>
										<label>Card owner *</label>
										<input
											type='text'
											className='form-control'
											name='name'
											onFocus={handleInputFocus}
											onChange={handleInputChange}
										/>
									</div>
									<div className='form-row form-group'>
										<div className='form-holder'>
											<label>Expiry *</label>
											<input
												onFocus={handleInputFocus}
												onChange={handleInputChange}
												type='text'
												className='form-control'
												name='expiry'
											/>
										</div>
										<div className='form-holder'>
											<label>CVV *</label>
											<input
												type='text'
												className='form-control'
												onFocus={handleInputFocus}
												onChange={handleInputChange}
												name='cvc'
											/>
										</div>
									</div>
								</div>
							</form>
						</div>
					</section>
					{/* SECTION 4 */}
					{/* <section>
						<div className='checkbox-circle'></div>
					</section> */}
				</StepWizard>
				{wizard && (
					<div className={'actions'}>
						<ul role='menu' aria-label='Pagination'>
							{currentStep > 0 && currentStep < 3 ? (
								<li
									aria-disabled='false'
									onClick={goPreviousStep}>
									<a href='#previous' role='menuitem'>
										Previous
									</a>
								</li>
							) : (
								<li
									aria-disabled='true'
									onClick={goPreviousStep}>
									<a href='#previous' role='menuitem'>
										Previous
									</a>
								</li>
							)}
							{currentStep !== 2 ? (
								<li
									aria-hidden='false'
									aria-disabled='false'
									onClick={nextStep}>
									<a href='#next' role='menuitem'>
										Next
									</a>
								</li>
							) : (
								<li aria-hidden='true'>
									<a
										onClick={() =>
											window.location.replace(
												'https://appointment.accureference.com'
											)
										}
										role='menuitem'>
										Finish
									</a>
								</li>
							)}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

export default Wizard;
