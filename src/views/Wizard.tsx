import React, { useState, useEffect } from 'react';
//@ts-ignore

import '../App.css';
import 'react-credit-cards/es/styles-compiled.css';
import StepWizard, { StepWizardProps } from 'react-step-wizard';
import { Card } from 'react-bootstrap'
import axios from 'axios'

import Wizard1 from '../components/wizard1';
import Wizard2 from '../components/wizard2';
import Wizard3 from '../components/wizard3';

import { getJsonFromUrl } from '../utils'

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
	isRealPayment: 0,
	insurancePhoto: null,
	stateId: null,
	requestId: null,
	request_type: 0,
};

const Wizard = (props) => {
	const [wizard, setWizard] = useState<StepWizardProps>();
	const [currentStep, setCurrentStep] = useState(0);
	const [data, setData] = useState({ ...initialState });

	const effect = async () => {
		const obj: any = getJsonFromUrl(window.location.href)
		let objState: any = {}
		objState.requestId = obj.requestId

		let response
		if(parseInt(obj.type) === 2){
			objState.request_type = 2
			response = await axios.get(`https://appointment.accureference.com/api/homedraw/${obj.requestId}`)
			
			if(response.data.data.length){
				let resData = {...response.data.data[0]}
				let objData: any = {}

				objData.phone = resData.phone
				objData.firstName = resData.peoples[0].firstname
				objData.lastName = resData.peoples[0].lastname

				let addressArr = resData.address.split(',').map(item => item.trim())
				if(addressArr.length === 1){
					objData.country = addressArr[0]
				}
				if(addressArr.length === 2){
					objData.townCity = addressArr[0]
					objData.country = addressArr[1]
				}
				if(addressArr.length === 3){
					objData.address2 = addressArr[0]
					objData.townCity = addressArr[1]
					objData.country = addressArr[2]
				}
				if(addressArr.length === 4){
					objData.address1 = addressArr[0]
					objData.address2 = addressArr[1]
					objData.townCity = addressArr[2]
					objData.country = addressArr[3]
				}
				if(addressArr.length > 4){
					let lastIndex = addressArr.length - 1
					let str = ''
					for (let i = 0; i < lastIndex - 2; i++){
						if(i !== 0){
							str += `, ${addressArr[i]}`
						} else {
							str += addressArr[i]
						}
					}
	
					objData.address1 = str
					objData.address2 = addressArr[lastIndex-2]
					objData.townCity = addressArr[lastIndex-1]
					objData.country = addressArr[lastIndex]
				}

				objState = {...objState, ...objData}
			}
		} else {
			response = await axios.get(`https://appointment.accureference.com/api/request/${obj.requestId}`)
			
			if(response.data.length){
				let resData = {...response.data[0]}
				let objData: any = {}
	
				objData.email = resData.email
				objData.phone = resData.phone
	
				let fullnameArr = resData.fullname.split(' ').map(item => item.trim())
				objData.firstName = fullnameArr[0]
				objData.lastName = fullnameArr[1]
	
				let addressArr = resData.address.split(',').map(item => item.trim())
				
				if(addressArr.length === 1){
					objData.country = addressArr[0]
				}
				if(addressArr.length === 2){
					objData.townCity = addressArr[0]
					objData.country = addressArr[1]
				}
				if(addressArr.length === 3){
					objData.address2 = addressArr[0]
					objData.townCity = addressArr[1]
					objData.country = addressArr[2]
				}
				if(addressArr.length === 4){
					objData.address1 = addressArr[0]
					objData.address2 = addressArr[1]
					objData.townCity = addressArr[2]
					objData.country = addressArr[3]
				}
				if(addressArr.length > 4){
					let lastIndex = addressArr.length - 1
					let str = ''
					for (let i = 0; i < lastIndex - 2; i++){
						if(i !== 0){
							str += `, ${addressArr[i]}`
						} else {
							str += addressArr[i]
						}
					}
	
					objData.address1 = str
					objData.address2 = addressArr[lastIndex-2]
					objData.townCity = addressArr[lastIndex-1]
					objData.country = addressArr[lastIndex]
				}
	
				objState = {...objState, ...objData}
			}
		}

		setData({...data, ...objState})
	}

	useEffect(() => {
		effect()
	}, [])

	const goToInitial = () => {
		setData({ ...initialState });
		setCurrentStep(0);
		//@ts-ignore
		wizard.goToStep(1);
	};

	const nextStep = () => {
		setCurrentStep(currentStep + 1);
		//@ts-ignore
		wizard.nextStep();
	};

	const goToStep = (index) => {
		//@ts-ignore
		wizard.goToStep(index + 1);
		setCurrentStep(index);
	};

	const goPreviousStep = () => {
		//@ts-ignore
		wizard.previousStep();
		setCurrentStep(currentStep - 1);
	};

	// @ts-ignore
	return (
		<div className='wrapper'>
			<div className='image-holder'>
				<img src={require('../assets/images/logo-blue.png')} />
			</div>
			<Card>
				<div className='wizard'>
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
					<StepWizard instance={(wizardInstance) => setWizard(wizardInstance)}>
						<Wizard3
							data={data}
							setData={setData}
							nextStep={nextStep}
							setCurrentStep={setCurrentStep}
						/>
						<Wizard1
							data={data}
							setData={setData}
							nextStep={nextStep}
							previousStep={goPreviousStep}
							setCurrentStep={setCurrentStep}
						/>
						<Wizard2
							data={data}
							setData={setData}
							initialState={initialState}
							previousStep={goPreviousStep}
							setCurrentStep={setCurrentStep}
						/>
					</StepWizard>
				</div>
			</Card>
		</div>
	);
}

export default Wizard;
