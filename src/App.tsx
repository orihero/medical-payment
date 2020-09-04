import React from 'react';
import './App.css';

function App() {
	return (
		<div className='wrapper'>
			<div className='image-holder'>
				<img src='images/form-wizard.png' alt='' />
			</div>
			<form>
				<div id='wizard'>
					{/* SECTION 1 */}
					<h4 />
					<section>
						<div className='form-row form-group'>
							<div className='form-holder'>
								<label>First Name *</label>
								<input type='text' className='form-control' />
							</div>
							<div className='form-holder'>
								<label>Last Name *</label>
								<input type='text' className='form-control' />
							</div>
						</div>
						<div className='form-row'>
							<label>Company Name</label>
							<input type='text' className='form-control' />
						</div>
						<div className='form-row'>
							<label>Country *</label>
							<div className='form-holder'>
								<select className='form-control'>
									<option value='viet nam' className='option'>
										Viet Nam
									</option>
									<option
										value='united states'
										className='option'>
										United States
									</option>
									<option
										value='united kingdom'
										className='option'>
										United Kingdom
									</option>
								</select>
								<i className='zmdi zmdi-caret-down' />
							</div>
						</div>
						<div className='form-row'>
							<label>Address *</label>
							<input
								type='text'
								className='form-control'
								placeholder='Street address'
								style={{ marginBottom: '20px' }}
							/>
							<input
								type='text'
								className='form-control'
								placeholder='Apartment, suite, unit etc. (optional)'
							/>
						</div>
						<div className='form-row'>
							<label>Town / City *</label>
							<input type='text' className='form-control' />
						</div>
					</section>
					{/* SECTION 2 */}
					<h4 />
					<section>
						<div className='form-row'>
							<label>County *</label>
							<input type='text' className='form-control' />
						</div>
						<div className='form-row'>
							<label>Postcode / Zip *</label>
							<input type='text' className='form-control' />
						</div>
						<div className='form-row form-group'>
							<div className='form-holder'>
								<label>Phone *</label>
								<input type='text' className='form-control' />
							</div>
							<div className='form-holder'>
								<label>Email Address *</label>
								<input type='text' className='form-control' />
							</div>
						</div>
						<div
							className='form-row'
							style={{ marginBottom: '18px' }}>
							<label>Order Notes</label>
							<textarea
								className='form-control'
								placeholder='Note about your order, eg. special notes fordelivery.'
								style={{ height: '149px' }}
								defaultValue={''}
							/>
						</div>
						<div className='checkbox'>
							<label>
								<input type='checkbox' /> Create an account?
								<span className='checkmark' />
							</label>
						</div>
					</section>
					{/* SECTION 3 */}
					<h4 />
					<section>
						<div className='product'>
							<div className='item'>
								<div className='left'>
									<a href='#' className='thumb'>
										<img src='images/item-1.png' alt='' />
									</a>
									<div className='purchase'>
										<h6>
											<a href='#'>Low Table/Stool</a>
										</h6>
										<span>x4</span>
									</div>
								</div>
								<span className='price'>$29</span>
							</div>
							<div className='item'>
								<div className='left'>
									<a href='#' className='thumb'>
										<img src='images/item-2.png' alt='' />
									</a>
									<div className='purchase'>
										<h6>
											<a href='#'>Set of 3 Porcelain</a>
										</h6>
										<span>x2</span>
									</div>
								</div>
								<span className='price'>$124</span>
							</div>
						</div>
						<div className='checkout'>
							<div className='subtotal'>
								<span className='heading'>Subtotal</span>
								<span>$364</span>
							</div>
							<p className='shipping'>
								<span className='heading'>Shipping</span>
								there are no shipping methods available. please
								double check your address, or contact us if you
								need any help.
							</p>
							<div className='total'>
								<span className='heading'>Subtotal</span>
								<span className='total-price'>$364</span>
							</div>
						</div>
					</section>
					{/* SECTION 4 */}
					<h4 />
					<section>
						<div className='checkbox-circle'>
							<label className='active'>
								<input
									type='radio'
									name='billing method'
									defaultValue='Direct bank transfer'
									defaultChecked
								/>
								Direct bank transfer&gt;
								<span className='checkmark' />
								<div className='tooltip'>
									Make your payment directly into our bank
									account. Please use your Order ID as the
									payment reference. Your order will not be
									shipped until the funds have cleared in our
									account.
								</div>
							</label>
							<label>
								<input
									type='radio'
									name='billing method'
									defaultValue='Check payments'
								/>
								Check payments
								<span className='checkmark' />
								<div className='tooltip'>
									Please send a check to Store Name, Store
									Street, Store Town, Store State / County,
									Store Postcode.
								</div>
							</label>
							<label>
								<input
									type='radio'
									name='billing method'
									defaultValue='Cash on delivery'
								/>
								Cash on delivery
								<span className='checkmark' />
								<div className='tooltip'>
									Pay with cash upon delivery.
								</div>
							</label>
						</div>
					</section>
				</div>
			</form>
		</div>
	);
}

export default App;
