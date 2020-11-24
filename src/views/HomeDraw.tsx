import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Modal, Card } from 'react-bootstrap';
import DateTimePicker from 'reactstrap-date-picker';
import validator from 'validator';
import MaskedInput from 'react-maskedinput';
import axios from 'axios';
import { formData } from '../utils';
import PlacesAutocomplete from 'react-places-autocomplete';
import { times } from './constants'

const HomeDraw = () => {
	const history = useHistory();
	const { typeTest, hasPresc } = useParams();

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

	const [price, setPrice] = useState(0)

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

		let priceForPeople
		if(typeTest === '0'){
			priceForPeople = 45
		}
		if(typeTest === '1'){
			priceForPeople = 50
		}
		if(typeTest === '2'){
			priceForPeople = 95
		}
		if(state.numberOfPeople > 1) {
			for(let i = 1; i < state.numberOfPeople; i++){
				priceForPeople += 18
			}
		}
		setPrice(priceForPeople)
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
			phone,
			suite,
			address,
			apartment,
			visitDate: { formattedValue },
			visitTime,
			numberOfPeople: number_of_peoples,
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
			formattedValue &&
			phone &&
			address &&
			apartment &&
			number_of_peoples &&
			fullnameArr.every((item) => item.firstname && item.lastname)
		) {
			let visitD = formattedValue.replace(/\//g, '-');
			visitD =
				visitD.slice(6) +
				'-' +
				visitD.slice(3, 5) +
				'-' +
				visitD.slice(0, 2);
			let visit_date_time = visitD + ' ' + visitTime + ':00';
			let has_prescription = hasPresc === 'true'
				? 1 : 0

			let obj: any = {
				suite,
				phone,
				address,
				apartment,
				type: typeTest,
				visit_date_time,
				has_prescription,
				number_of_peoples,
			};
			for (let i = 0; i < number_of_peoples; i++) {
				obj[`firstname[${i}]`] = fullnameArr[i].firstname;
				obj[`lastname[${i}]`] = fullnameArr[i].lastname;
			}
			obj.type = parseInt(obj.type);
			// console.log('obj: ', obj)
			obj = formData(obj);

			axios
				.post('https://appointment.accureference.com/api/homedraw', obj)
				.then((res) => {
					console.log('res: ', res)
					if (res.data.status === 'success') {
						history.push(
							`/appointment?type=2&requestId=${res.data.data.id}`
						);
					} else {
						console.log('res.data: ', res.data);
						alert('Invalid credentials');
					}
				});
		} else {
			let arr = [...errFullArr];

			if (!formattedValue) {
				obj.visitDate = true;
				alert('Please select currect date');
			}
			if (!phone) obj.phone = true;
			if (!address) obj.address = true;
			if (!number_of_peoples) obj.numberOfPeople = true;
			if (!apartment) obj.apartment = true;

			fullnameArr.map((item, index) => {
				if (!item.firstname) arr[index].first = true;
				if (!item.lastname) arr[index].last = true;
			});
		}

		setErrFullArr([...arr]);
		setErrorState(obj);
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
						{`Total cost: $${price}`}
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
			</Card>
		</div>
	);
};

export default HomeDraw;
