import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormCheck as Check } from 'react-bootstrap';

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
				<div className='parent--flex--row'>
					<div className='checkbox--row--title'>
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
							{/* <label htmlFor='bir'></label> */}
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
							{/* <label htmlFor='ikki'>Antibody Test</label> */}
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
							{/* <label htmlFor='uch'>
								
							</label> */}
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
						style={{ marginTop: '2em' }}
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
							{/* <label htmlFor='tort'>Site Visit</label> */}
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
							{/* <label htmlFor='besh'>Home Draw</label> */}
						</div>
					</div>
					{errorText.b ? (
						<div className='validation-error'>
							Type location required
						</div>
					) : null}
					<div
						className='checkbox--btn--row'
						style={{ justifyContent: 'center' }}>
						<button onClick={onFinish}>Next</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Agreement;
