import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Modal, Card } from 'react-bootstrap';
import DateTimePicker from 'reactstrap-date-picker';
import validator from 'validator';
import MaskedInput from 'react-maskedinput';
import axios from 'axios';
import { formData } from '../utils';
import PlacesAutocomplete from 'react-places-autocomplete';

const times = [
	'9:00',
	'9:05',
	'9:10',
	'9:15',
	'9:20',
	'9:25',
	'9:30',
	'9:35',
	'9:40',
	'9:45',
	'9:50',
	'9:55',
	'10:00',
	'10:05',
	'10:10',
	'10:15',
	'10:20',
	'10:25',
	'10:30',
	'10:35',
	'10:40',
	'10:45',
	'10:50',
	'10:55',
	'11:00',
	'11:05',
	'11:10',
	'11:15',
	'11:20',
	'11:25',
	'11:30',
	'11:35',
	'11:40',
	'11:45',
	'11:50',
	'11:55',
	'12:00',
	'12:05',
	'12:10',
	'12:15',
	'12:20',
	'12:25',
	'12:30',
	'12:35',
	'12:40',
	'12:45',
	'12:50',
	'12:55',
	'13:00',
	'13:05',
	'13:10',
	'13:15',
	'13:20',
	'13:25',
	'13:30',
	'13:35',
	'13:40',
	'13:45',
	'13:50',
	'13:55',
	'14:00',
	'14:05',
	'14:10',
	'14:15',
	'14:20',
	'14:25',
	'14:30',
	'14:35',
	'14:40',
	'14:45',
	'14:50',
	'14:55',
	'15:00',
	'15:05',
	'15:10',
	'15:15',
	'15:20',
	'15:25',
	'15:30',
	'15:35',
	'15:40',
	'15:45',
	'15:50',
	'15:55',
	'16:00',
	'16:05',
	'16:10',
	'16:15',
	'16:20',
	'16:25',
	'16:30',
	'16:35',
	'16:40',
	'16:45',
	'16:50',
	'16:55',
];

const HomeDraw = () => {
	const history = useHistory();
	const { typeTest } = useParams();

	const [state, setState] = useState({
		phone: '',
		address: '',
		suite: '',
		apartment: '',
		visitDate: {
			value: null,
			formattedValue: null,
		},
		visitTime: '9:00',
		numberOfPeople: 1,
	});
	const [errorState, setErrorState] = useState({
		phone: false,
		address: false,
		suite: false,
		apartment: false,
		visitDate: false,
		numberOfPeople: false,
	});

	const [fullnameArr, setFullnameArr] = useState<any[]>([]);
	const [errFullArr, setErrFullArr] = useState<any[]>([]);

	const [modalShow, setModalShow] = useState(false);
	const [acceptChecked, setAcceptChecked] = useState(false);

	useEffect(() => {
		if (state.numberOfPeople) {
			let arr: any[] = [];
			let errArr: any[] = [];
			for (let i = 0; i < state.numberOfPeople; i++) {
				arr = [...arr, { firstname: '', lastname: '' }];
				errArr = [...errArr, { first: false, last: false }];
			}
			setFullnameArr([...arr]);
			setErrFullArr([...errArr]);
		} else {
			setState({ ...state, numberOfPeople: 0 });
		}
	}, [state.numberOfPeople]);

	const onPickerDateChange = (value, formattedValue) => {
		let currentDate = new Date();
		let selectedDate = new Date(value);
		currentDate.setHours(0);
		selectedDate.setHours(0);
		if (selectedDate > currentDate) {
			setState({ ...state, visitDate: { value, formattedValue } });
		} else {
			setState({
				...state,
				visitDate: {
					value: null,
					formattedValue: null,
				},
			});
			alert('You cannot make an appointment on this day!');
		}
	};

	const onChange = (e) => {
		setState({
			...state,
			numberOfPeople: parseInt(e.target.value.replace(/[^\d+]/g, '')),
		});
	};

	const onPhoneNumberChange = ({ target }) => {
		setState({ ...state, phone: target.value });
		// setData({ ...data, phone: target.value });
		if (!validator.isMobilePhone(target.value, 'any')) {
			setErrorState({ ...errorState, phone: true });
		} else {
			setErrorState({ ...errorState, phone: false });
		}
	};

	const handleChange = (e, key, index) => {
		let arr = fullnameArr;
		arr[index][key] = e.target.value;
		setFullnameArr([...arr]);
	};

	const onFinish = (e) => {
		e.preventDefault();

		const {
			suite,
			phone,
			address,
			visitDate,
			apartment,
			numberOfPeople,
		} = state;

		let obj = {
			phone: false,
			apartment: false,
			suite: false,
			address: false,
			visitDate: false,
			numberOfPeople: false,
		};
		let arr = errFullArr.map((item) => {
			item.first = false;
			item.last = false;

			return item;
		});

		if (
			visitDate.formattedValue &&
			phone &&
			address &&
			apartment &&
			numberOfPeople &&
			fullnameArr.every((item) => item.firstname && item.lastname)
		) {
			setModalShow(true);
		} else {
			let arr = [...errFullArr];

			if (!visitDate.formattedValue) {
				obj.visitDate = true;
				alert('Please select currect date');
			}
			if (!phone) obj.phone = true;
			if (!address) obj.address = true;
			if (!numberOfPeople) obj.numberOfPeople = true;
			if (!apartment) obj.apartment = true;

			fullnameArr.map((item, index) => {
				if (!item.firstname) arr[index].first = true;
				if (!item.lastname) arr[index].last = true;
			});
		}

		setErrFullArr([...arr]);
		setErrorState(obj);
	};

	const onFinishClick = async (e) => {
		e.preventDefault();

		const {
			phone,
			suite,
			address,
			apartment,
			visitDate: { formattedValue },
			visitTime,
			numberOfPeople: number_of_peoples,
		} = state;

		let visitD = formattedValue.replace(/\//g, '-');
		visitD =
			visitD.slice(6) +
			'-' +
			visitD.slice(3, 5) +
			'-' +
			visitD.slice(0, 2);
		let visit_date_time = visitD + ' ' + visitTime + ':00';

		let obj: any = {
			suite,
			phone,
			address,
			apartment,
			type: typeTest,
			visit_date_time,
			number_of_peoples,
		};
		for (let i = 0; i < number_of_peoples; i++) {
			obj[`firstname[${i}]`] = fullnameArr[i].firstname;
			obj[`lastname[${i}]`] = fullnameArr[i].lastname;
		}
		obj.type = parseInt(obj.type);
		obj = formData(obj);

		axios
			.post('https://appointment.accureference.com/api/homedraw', obj)
			.then((res) => {
				if (res.data.status === 'success') {
					history.push(
						`/appointment?type=1&requestId=${res.data.data.id}`
					);
				} else {
					console.log('res.data: ', res.data);
					alert('Invalid credentials');
				}
			});
	};

	return (
		<div className='wrapper'>
			<div className='image-holder'>
				<img src={require('../assets/images/logo-blue.png')} />
			</div>
			<Card>
				<div className='homedraw--cont'>
					<div className='homedraw--row'>
						<label htmlFor='visitDate'>Visit Date</label>
						<DateTimePicker
							id='visitDate'
							value={state.visitDate.value}
							onChange={(v, f) => onPickerDateChange(v, f)}
						/>
						{errorState.visitDate ? (
							<div className='homedraw--error'>Required</div>
						) : null}
					</div>
					<div className='homedraw--row'>
						<label htmlFor='visitTime' style={{ marginTop: '1em' }}>
							Visit Time
						</label>
						<select
							id='visitTime'
							name='visitTime'
							defaultValue={times[0]}
							onChange={(e) =>
								setState({
									...state,
									visitTime: e.target.value,
								})
							}>
							{times.map((item: any, index) => (
								<option key={index} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>
					<PlacesAutocomplete
						value={state.address}
						onChange={(address) => setState({ ...state, address })}
						onSelect={(address, p1) =>
							setState({ ...state, address })
						}>
						{({
							getInputProps,
							suggestions,
							getSuggestionItemProps,
							loading,
						}) => (
							<div className='homedraw--row'>
								<label
									htmlFor='address'
									style={{ marginTop: '1em' }}>
									Address
								</label>
								<input
									type='text'
									id='address'
									className='input'
									value={state.address}
									placeholder='Enter address...'
									onChange={(e) =>
										setState({
											...state,
											address: e.target.value,
										})
									}
									{...getInputProps({
										placeholder: 'Enter your address',
										// className: 'location-search-input',
									})}
								/>
								{errorState.address ? (
									<div className='homedraw--error'>
										Required
									</div>
								) : null}
								<div className='autocomplete-dropdown-container'>
									{loading && <div>Loading...</div>}
									{suggestions.map((suggestion) => {
										const className = suggestion.active
											? 'suggestion-item--active'
											: 'suggestion-item';
										// inline style for demonstration purpose
										const style = suggestion.active
											? {
													backgroundColor: '#fafafa',
													cursor: 'pointer',
											  }
											: {
													backgroundColor: '#ffffff',
													cursor: 'pointer',
											  };
										return (
											<div
												{...getSuggestionItemProps(
													suggestion,
													{
														className,
														style,
													}
												)}>
												<span>
													{suggestion.description}
												</span>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</PlacesAutocomplete>
					<div className='homedraw--row'>
						<label htmlFor='apartment' style={{ marginTop: '1em' }}>
							Apartment / Suite
						</label>
						<input
							type='text'
							id='apartment'
							className='input'
							value={state.apartment}
							placeholder='Enter apartment...'
							onChange={(e) =>
								setState({
									...state,
									apartment: e.target.value,
								})
							}
						/>
						{errorState.apartment ? (
							<div className='homedraw--error'>Required</div>
						) : null}
					</div>
					{/* <div className='homedraw--row'>
						<label htmlFor='suite' style={{ marginTop: '1em' }}>
							Suite
						</label>
						<input
							type='text'
							id='suite'
							className='input'
							value={state.suite}
							placeholder='Enter suite...'
							onChange={(e) =>
								setState({ ...state, suite: e.target.value })
							}
						/>
						{errorState.suite ? (
							<div className='homedraw--error'>Required</div>
						) : null}
					</div> */}
					<div className='homedraw--row'>
						<label htmlFor='phone' style={{ marginTop: '1em' }}>
							Phone number
						</label>
						<input
							type='text'
							className='input'
							value={state.phone}
							placeholder='Enter your phone number'
							onFocus={() => setState({ ...state, phone: '+1' })}
							onChange={({ target }) => {
								if (
									target.value &&
									!target.value.startsWith('+')
								) {
									setState({
										...state,
										phone: '+1' + target.value,
									});
									return;
								}
								if (target.value.length > 12) {
									return;
								}
								setState({ ...state, phone: target.value });
							}}
						/>
						{/* <MaskedInput
							type='text'
							className='input'
							value={state.phone}
							mask='\+\1 (111) 111-1111'
							onChange={onPhoneNumberChange}
							placeholder={`+1 (XXX) XXX-XXXX`}
						/> */}
						{errorState.phone ? (
							<div className='homedraw--error'>
								Please enter valid phone number
							</div>
						) : null}
					</div>
					<div className='homedraw--row'>
						<label
							htmlFor='numberOfPeople'
							style={{ marginTop: '2em' }}>
							Number of People
						</label>
						<input
							type='text'
							className='input'
							id='numberOfPeople'
							onChange={onChange}
							value={state.numberOfPeople}
							placeholder='Enter number of people'
						/>
						{errorState.numberOfPeople ? (
							<div className='homedraw--error'>Required</div>
						) : null}
					</div>
					<p>
						{`$60  for each = Total cost $${
							60 * state.numberOfPeople
						}`}
					</p>
					{fullnameArr.length
						? fullnameArr.map((item, index) => (
								<div key={index}>
									<div>
										<div className='flex--input--box'>
											<label
												htmlFor={`firstnameLabel${index}`}>
												Firstname
											</label>
											<input
												type='text'
												value={item.firstname}
												id={`firstnameLabel${index}`}
												onChange={(e) =>
													handleChange(
														e,
														'firstname',
														index
													)
												}
											/>
											{errFullArr[index].first ? (
												<div className='flex--input--error'>
													Required
												</div>
											) : null}
										</div>
									</div>
									<div className='flex--input--row'>
										<div className='flex--input--box'>
											<label
												htmlFor={`lastnameLabel${index}`}>
												Lastname
											</label>
											<input
												type='text'
												value={item.lastname}
												id={`lastnameLabel${index}`}
												onChange={(e) =>
													handleChange(
														e,
														'lastname',
														index
													)
												}
											/>
											{errFullArr[index].last ? (
												<div className='flex--input--error'>
													Required
												</div>
											) : null}
										</div>
									</div>
								</div>
						  ))
						: null}
					<div className='checkbox--btn--row'>
						<button onClick={onFinish}>Finish</button>
					</div>
				</div>
				<Modal show={modalShow} onHide={() => setModalShow(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Contract</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<div>
							The Company shall provide COVID testing for those
							Travellers identified by Pure Health and shall
							provide test results in accordance with the workflow
							and TAT herein agreed. The Traveller shall be
							notified by the Company as to a patient service
							centre location where the Traveller may obtain COVID
							testing. In compliance with local laws, Company may
							require that Travellers provide an order for COVID
							testing from an authorized medical practitioner
							prior to performing a COVID test. Pure Health will
							collect a fee of Five USD (5.00 USD) from the
							Travellers needing a testing order. This fee is
							collected by Pure Health on behalf of the ordering
							practitioner. Pure Health will transmit this fee to
							Company for Company to transmit to the ordering
							practitioner, without setoff or deduction by either
							party.
						</div>
						<div className='modal--bottom--box'>
							<div
								onClick={() =>
									setAcceptChecked(!acceptChecked)
								}>
								<input
									id='accept'
									name='accept'
									type='checkbox'
									checked={acceptChecked}
								/>
								<label htmlFor='accept'>Accept</label>
							</div>
							<button
								onClick={onFinishClick}
								disabled={!acceptChecked}
								style={{ border: 'none', outline: 'none' }}
								className={`${
									acceptChecked ? 'active--button' : ''
								}`}>
								Finish
							</button>
						</div>
					</Modal.Body>
				</Modal>
			</Card>
		</div>
	);
};

export default HomeDraw;
