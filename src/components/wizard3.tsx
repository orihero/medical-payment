import React, { useState } from 'react'

import axios from 'axios'

import MaskedInput from 'react-maskedinput'
import Cards from 'react-credit-cards';

enum Fields { cvc = 'cvc' }

const Wizard3 = ({
    data,
    setData,
    goInitial,
    previousStep,
    setCurrentStep
}) => {
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

    const formData = (rawData) => {
        let form = new FormData();

        Object.keys(rawData).forEach((key) => {
            form.append(key, rawData[key]);
        });

        return form;
    };

    const onPreviousStep = () => {
        setCurrentStep(1)
        previousStep()
    }
    
    const handleInputFocus = (e: any) => {
		setCard({ ...card, focus: e.target.name });
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCard({ ...card, [name]: value });
	};

	const onCardChange = (e) => {
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

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const { cvc, expiry, name, number } = card
        const { cvc: cvcError, expiry: expiryError } = errorText

        setErrorText({...errorText, last: ''})

        if(
            cvc === '' || expiry === '' || name === '' ||
            number === '' || cvcError || expiryError ||
            parseInt(number).toString().length !== 16

        ){
            setErrorText({...errorText, last: 'Make sure you filled all fields correctly'})
        } else {
            const {
                firstName,
                lastName,
                address1,
                address2,
                townCity,
                country,
                postCode,
                phone,
                email,
            } = data

            let rawData = {
                firstname: firstName,
                lastname: lastName,
                country: 1,
                address: `${address1}, ${address2}`,
                city: townCity,
                postcode: postCode,
                phone,
                email,
                card_numer: number,
                card_owner: name,
                card_expiry: expiry,
                card_cvv: cvc,
            }
            
            try {
                const response = await axios.post('https://appointment.accureference.com/api/payment', rawData)

                if(response.data.status === 'error'){
                    alert('Invalid credentials')
                } else {
                    setCard({
                        cvc: '',
                        expiry: '',
                        focus: '' as Fields,
                        name: '',
                        number: '',
                    })
                    console.log('response: ', response)
                    console.log('response.data: ', response.data)
                    setErrorText({...errorText, number: ''})
                    window.location.reload()
                    // goInitial()
                }
            } catch(err){
                console.log('apiErr: ', err)
            }
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