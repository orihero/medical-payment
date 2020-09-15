import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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

		if (
			(firstCheckValue.a || firstCheckValue.b || firstCheckValue.c) &&
			(secondCheckValue.a || secondCheckValue.b)
		) {
			if (secondCheckValue.a) {
				console.log('onFinish Pressed...');
				window.location.href = 'https://appointment.accureference.com';
			} else {
				history.push('/home-draw');
			}
		} else {
			let objBool = { a: false, b: false };
			if (
				!(firstCheckValue.a || firstCheckValue.b || firstCheckValue.c)
			) {
				objBool.a = true;
			}
			if (!(secondCheckValue.a || secondCheckValue.b)) {
				objBool.b = true;
			}
			setErrorText(objBool);
		}
	};

	return (
		<div className='wrapper'>
			<div className='image-holder'>
				<img src={require('../assets/images/logo-blue.png')} />
			</div>
			<div id='wizard' style={{ overflow: 'hidden' }}>
				<div style={{ width: '35vw' }}>
					<div className='checkbox--row--title'>Type test</div>
					<div
						className='checkbox--row'
						onClick={() => onFirstChange('a')}>
						<input
							id='bir'
							name='bir'
							type='checkbox'
							checked={firstCheckValue.a ? true : false}
						/>
						<label htmlFor='bir'>Covid 19</label>
					</div>
					<div
						className='checkbox--row'
						onClick={() => onFirstChange('b')}>
						<input
							id='ikki'
							name='ikki'
							type='checkbox'
							checked={firstCheckValue.b ? true : false}
						/>
						<label htmlFor='ikki'>Antibody Test</label>
					</div>
					<div
						className='checkbox--row'
						onClick={() => onFirstChange('c')}>
						<input
							id='uch'
							name='uch'
							type='checkbox'
							checked={firstCheckValue.c ? true : false}
						/>
						<label htmlFor='uch'>Covid 19 + Antibody Test</label>
					</div>
					{errorText.a ? (
						<div className='validation-error'>
							Type test required
						</div>
					) : null}
					<div className='checkbox--row--title'>Type location</div>
					<div
						className='checkbox--row'
						onClick={() => onSecondChange('a')}>
						<input
							id='tort'
							name='tort'
							type='checkbox'
							checked={secondCheckValue.a ? true : false}
						/>
						<label htmlFor='tort'>Site Visit</label>
					</div>
					<div
						className='checkbox--row'
						onClick={() => onSecondChange('b')}>
						<input
							id='besh'
							name='besh'
							type='checkbox'
							checked={secondCheckValue.b ? true : false}
						/>
						<label htmlFor='besh'>Home Draw</label>
					</div>
					{errorText.b ? (
						<div className='validation-error'>
							Type location required
						</div>
					) : null}
					<div className='checkbox--btn--row'>
						<button onClick={onFinish}>Finish</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Agreement;
