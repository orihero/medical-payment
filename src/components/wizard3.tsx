import React, { useState } from 'react'

import validator from 'validator'
import MaskedInput from 'react-maskedinput'

import Cards from 'react-credit-cards';
import { error } from 'console';

enum Fields { cvc = 'cvc' }

const Wizard3 = ({ setCurrentStep, previousStep, data, setData }) => {
    const [card, setCard] = useState({
		cvc: '',
		expiry: '',
		focus: '' as Fields,
		name: '',
		number: '',
    });
    const [errorText, setErrorText] = useState({
        cvc: '',
		expiry: '',
		focus: '',
		name: '',
        number: '',
        last: '',
    })

    const onPreviousStep = () => {
        setCurrentStep(1)
        previousStep()
    }
    
    let handleInputFocus = (e: any) => {
		console.log({ e });
		setCard({ ...card, focus: e.target.name });
	};

	let handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCard({ ...card, [name]: value });
	};

	let onCardChange = (e) => {
        console.log('e', e);
        if(e.issuer === 'unknown'){
            setErrorText({...errorText, number: 'Please enter valid card number'})
        } else {
            setErrorText({...errorText, number: ''})
        }
	};

    const onCardNumberChange = (e: any) => {
        let a = e.target.value
        let str = a.slice(0,4) + a.slice(5, 9) + a.slice(10, 14) + a.slice(15)
        setCard({...card, number: str})
    }

    const onExpiryChange = (e: any) => {
        let a = e.target.value.replace(/[^\d+]/g, '')
        if(
            parseInt(a.slice(0, 2)) < 1 || parseInt(a.slice(0, 2)) > 12 ||
            parseInt(a.slice(2)) <= parseInt(new Date().getFullYear().toString().slice(2))
            || a.length < 4
        ){
            setErrorText({...errorText, expiry: 'Please enter valid expiry date. (month/year)'})
        } else {
            setErrorText({...errorText, expiry: ''})
        }
        setCard({...card, expiry: a})
    }

    const onCvcChange = (e: any) => {
        if(e.target.value.length < 3){
            setErrorText({...errorText, cvc: 'Invalid cvc'})
        } else {
            setErrorText({...errorText, cvc: ''})
        }
        setCard({...card, cvc: e.target.value.replace(/[^\d+]/g, '')})
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        const { cvc, expiry, name, number } = card

        if(cvc === '' || expiry === '' || name === '' || number === ''){
            setErrorText({...errorText, last: 'Please fill all fields'})
        } else {
            alert('OK!')
        }
        // window.location.replace(
        //     `https://appointment.accureference.com?paymentId=${0}`
        // )
    }

    return(
        // SECTION 3
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
                                    type='tel'
                                    name='expiry'
                                    maxLength={4}
                                    value={card.expiry}
                                    className='form-control'
                                    onFocus={handleInputFocus}
                                    onChange={onExpiryChange}
                                    // onChange={handleInputChange}
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
                                    // onChange={handleInputChange}
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
            </div>
            {errorText.last ? (
                <div className='validation-error'>
                    {errorText.last}
                </div>
            ) : null}
            <div className='actions'>
                <ul role='menu' aria-label='Pagination'>
                    <li
                        aria-disabled='false'
                        onClick={onPreviousStep}>
                        <a role='menuitem'>
                            Previous
                        </a>
                    </li>
                    <li aria-hidden='true'>
                        <a
                            role='menuitem'
                            onClick={onSubmit}
                        >
                            Finish
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Wizard3