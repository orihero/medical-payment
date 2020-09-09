import React, { useState } from 'react';
//@ts-ignore

import '../App.css';
import 'react-credit-cards/es/styles-compiled.css';
import StepWizard from 'react-step-wizard';
import yup from 'yup';

import Wizard1 from '../components/wizard1';
import Wizard2 from '../components/wizard2';
import Wizard3 from '../components/wizard3';

const initialState = {
	firstName: '',
	lastName: '',
	address1: '',
	address2: '',
	townCity: '',
	country: '',
	postCode: '',
	phone: '',
	email: '',
	commit: '',
	cardNumber: '',
	cardOwner: '',
	expiry: '',
	cvc: '',
}

function Wizard(props) {
	// let requestModel = yup.shape();
	const [wizard, setWizard] = useState();
	const [currentStep, setCurrentStep] = useState(0);
	const [data, setData] = useState({...initialState});

	const goToInitial = () => {
		setData({...initialState})
		console.log('iwladi')
		setCurrentStep(0)
		wizard.goToStep(1);
	}

	const nextStep = () => {
		setCurrentStep(currentStep + 1);
		wizard.nextStep();
	};

	const goToStep = (index) => {
		wizard.goToStep(index + 1);
		setCurrentStep(index);
	};

	const goPreviousStep = () => {
		wizard.previousStep();
		setCurrentStep(currentStep - 1);
	};

	// @ts-ignore
	return (
		<div className='wrapper'>
			<div className='image-holder'>
				<img src={require('../assets/images/logo-blue.png')} />
			</div>
			<div id='wizard' style={{ overflow: 'hidden' }}>
				<div className={'steps'}>
					<ul className={`step-${currentStep + 1}`}>
						{[...new Array(3)].map((item, index) => {
							return (
								<li
									key={index}
									onClick={() => goToStep(index)}
									className={`${index === 0 && 'first'} ${
										index === 2 && 'last'
									} ${currentStep >= index && 'checked'}`}>
									<a style={{ cursor: 'pointer' }}>
										<span />
									</a>
								</li>
							);
						})}
					</ul>
				</div>
				<StepWizard
					instance={(wizardInstance) => setWizard(wizardInstance)}>
					<Wizard1
						data={data}
						setData={setData}
						nextStep={nextStep}
						setCurrentStep={setCurrentStep}
					/>
					<Wizard2
						data={data}
						setData={setData}
						nextStep={nextStep}
						previousStep={goPreviousStep}
						setCurrentStep={setCurrentStep}
						// previousStep={() => wizard.previousStep()}
					/>
					<Wizard3
						data={data}
						setData={setData}
						goInitial={goToInitial}
						previousStep={goPreviousStep}
						setCurrentStep={setCurrentStep}
						// previousStep={() => wizard.previousStep()}
					/>
				</StepWizard>
			</div>
		</div>
	);
}

export default Wizard;
