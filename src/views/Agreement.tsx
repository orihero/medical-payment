import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormCheck as Check, Card } from 'react-bootstrap';

const Agreement = () => {
	const history = useHistory();

	const [firstCheckValue, setFirstCheckValue] = useState({
		a: false,
		b: false,
		c: false,
	});
	const [secondCheckValue, setSecondCheckValue] = useState({
		a: false,
		b: false,
	});
	// const [hasPresc, setHasPresc] = useState(true)
	const [errorText, setErrorText] = useState({ a: false, b: false });

	const onFirstChange = (value) => {
		setErrorText({ a: false, b: false });
		if (value === 'a') {
			setFirstCheckValue({ a: !firstCheckValue.a, b: false, c: false });
		}
		if (value === 'b') {
			setFirstCheckValue({ b: !firstCheckValue.b, a: false, c: false });
		}
		if (value === 'c') {
			setFirstCheckValue({ c: !firstCheckValue.c, a: false, b: false });
		}
	};

	const onSecondChange = (value) => {
		setErrorText({ a: false, b: false });
		if (value === 'a') {
			setSecondCheckValue({ a: !secondCheckValue.a, b: false });
		}
		if (value === 'b') {
			setSecondCheckValue({ b: !secondCheckValue.b, a: false });
		}
	};

	const onFinish = (e) => {
		e.preventDefault();

		if(secondCheckValue.a || secondCheckValue.b){
			if(secondCheckValue.a){
				if(firstCheckValue.a || firstCheckValue.b || firstCheckValue.c){
					if(firstCheckValue.a){
						window.location.href = 'https://appointment.accureference.com/?param=0'
					}
					if(firstCheckValue.b){
						window.location.href = 'https://appointment.accureference.com/?param=1'
					}
					if(firstCheckValue.c){
						window.location.href = 'https://appointment.accureference.com/?param=2'
					}
				} else {
					setErrorText({
						...errorText,
						a: true
					})
				}
			} else {
				if(firstCheckValue.a || firstCheckValue.b || firstCheckValue.c){
					if(firstCheckValue.a){
						history.push('/home-draw/0');
					}
					if(firstCheckValue.b){
						history.push('/home-draw/1');
					}
					if(firstCheckValue.c){
						history.push('/home-draw/2');
					}
				} else {
					setErrorText({
						...errorText,
						a: true
					})
				}
			}
		} else {
			setErrorText({
				...errorText,
				b: true
			})
		}
	};

	return (
		<div className='wrapper'>
			<div className='image-holder'>
				<img src={require('../assets/images/logo-blue.png')} />
			</div>
			<Card>
				<div className='parent--flex--row'>
					<div
						className='checkbox--row--title'>
						Choose type of the Visit
					</div>
					<div className='flex--row'>
						<div className='checkbox--row'>
							<Check
								type='switch'
								id='custom-switch4'
								label='Site Visit'
								checked={secondCheckValue.a}
								onChange={() => onSecondChange('a')}
							/>
						</div>
						<div
							className='checkbox--row'
							style={{ marginLeft: '2em' }}>
							<Check
								type='switch'
								id='custom-switch5'
								label='Home Draw'
								checked={secondCheckValue.b}
								onChange={() => onSecondChange('b')}
							/>
						</div>
					</div>
					{errorText.b ? (
						<div className='validation-error'>
							Type location required
						</div>
					) : null}
					<div
						style={{ marginTop: '2em' }}
						className='checkbox--row--title'>
						Choose type of the Test
					</div>
					<div className='flex--row'>
						<div className='checkbox--row'>
							<Check
								type='switch'
								id='custom-switch1'
								label='Covid 19'
								checked={firstCheckValue.a}
								onChange={() => onFirstChange('a')}
							/>
						</div>
						<div
							className='checkbox--row'
							style={{ marginLeft: '2em' }}>
							<Check
								type='switch'
								id='custom-switch2'
								label='Antibody Test'
								checked={firstCheckValue.b}
								onChange={() => onFirstChange('b')}
							/>
						</div>
						<div
							className='checkbox--row'
							style={{ marginLeft: '2em' }}>
							<Check
								type='switch'
								id='custom-switch3'
								label='Covid 19 + Antibody Test'
								checked={firstCheckValue.c}
								onChange={() => onFirstChange('c')}
							/>
						</div>
					</div>
					{errorText.a ? (
						<div
							style={{ marginTop: '10px' }}
							className='validation-error'>
							Type test required
						</div>
					) : null}
					<div
						className='checkbox--btn--row'
						style={{ justifyContent: 'center' }}>
						<button onClick={onFinish}>Next</button>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Agreement;
