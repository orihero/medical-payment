import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Modal } from 'react-bootstrap'
import DateTimePicker from 'reactstrap-date-picker'

const times = [
    '9:00', '9:05', '9:10', '9:15', '9:20', '9:25', '9:30', '9:35', '9:40', '9:45', '9:50', '9:55',
    '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55',
    '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55',
    '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55',
    '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55',
    '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55',
    '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55',
    '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55',
]

const HomeDraw = () => {
    const history = useHistory()

    const [number, setNumber] = useState(0)
    const [pickerDate, setPickerDate] = useState({
        value: new Date().toISOString(),
        formattedValue: null
    })
    const [visitDate, setVisitDate] = useState('')

    const [modalShow, setModalShow] = useState(false)
    const [acceptChecked, setAcceptChecked] = useState(false)

    const onPickerDateChange = (value, formattedValue) => {
        setPickerDate({value, formattedValue})
    }

    const onChange = (e) => {
        setNumber(e.target.value.replace(/[^\d+]/g, ''))
    }

    const onFinish = (e) => {
        e.preventDefault()
        setModalShow(true)
    }

    const onFinishClick = e => {
        e.preventDefault()
        history.push('/agreement')
    }

    return(
        <div className='wrapper'>
			<div className='image-holder'>
				<img src={require('../assets/images/logo-blue.png')} />
			</div>
			<div id='wizard' style={{ overflow: 'hidden' }}>
				<div className='homedraw--cont'>
                    <label htmlFor="numberOfPeople">Number of People</label>
                    <input
                        type="text"
                        value={number}
                        className='input'
                        id='numberOfPeople'
                        onChange={onChange}
                        placeholder='Enter number of people'
                    />
                    <p>
                        {`60$  for each = Total cost ${60*number}$`}
                    </p>
                    <label htmlFor="visitDate" style={{marginTop: '1em'}}>Visit Date</label>
                    <DateTimePicker
                        id="visitDate" 
                        value={pickerDate.value} 
                        onChange={(v,f) => onPickerDateChange(v, f)}
                    />
                    <label htmlFor="visitTime" style={{marginTop: '1em'}}>Visit Time</label>
                    <select name="visitTime" id="visitTime">
                        {times.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <Modal show={modalShow} onHide={() => setModalShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Contract</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta neque nobis ea laudantium? Minima nihil dicta voluptatum amet fugiat totam fugit, veritatis molestiae earum placeat quos non sunt numquam praesentium corrupti accusantium consequatur enim. Quia totam quas ipsam ea, nulla sequi consequuntur. Ex nostrum, molestias nisi iste eum a? Asperiores perspiciatis natus laboriosam dolor adipisci ducimus, labore minima eaque veritatis blanditiis ratione fugit, molestias at neque ab nihil repudiandae est dolorum dignissimos. Pariatur expedita vero placeat delectus temporibus necessitatibus assumenda! Rem molestiae odit optio minus blanditiis doloribus necessitatibus enim quis. Fuga asperiores recusandae eum sapiente tempora reiciendis soluta sint repellendus!   
                        </div>
                        <div className='modal--bottom--box'>
                            <div onClick={() => setAcceptChecked(!acceptChecked)}>
                                <input
                                    id="accept"
                                    name="accept"
                                    type="checkbox"
                                    checked={acceptChecked}
                                />
                                <label htmlFor="accept">Accept</label>
                            </div>
                            <button
                                style={{border: 'none', outline: 'none'}}
                                disabled={!acceptChecked}
                                onClick={onFinishClick}
                            >
                                Finish
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
                <div className='checkbox--btn--row'>
                    <button onClick={onFinish}>Finish</button>
                </div>
			</div>
		</div>
    )
}

export default HomeDraw