import React from 'react';
import '../assets/css/style.css';
import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<div style={{overflowX: 'hidden'}}>
			<header
				id='home'
				className='home-area hero-equal-height section-padding overflow-hidden d-flex align-items-center'>
				<a className='navbar-brand my-class js-scroll'>Covid 19</a>
				<div className='container'>
					<div className='row align-items-center'>
						<div className='col-12 col-md-12 col-lg-12'>
							<div className='text-left home-content z-index position-relative'>
								<h1 style={{ textAlign: 'center' }}>
									Stay Home Stay Safe <br /> From Covid-19
								</h1>
								<p style={{ textAlign: 'center' }}>
									COVID-19 is the infectious disease caused by
									the most recently discovered coronavirus.{' '}
									<br /> This new virus and disease were
									unknown before the outbreak began <br /> in
									Wuhan, China, in December 2019.
								</p>
							</div>
							<Link to='/appointment' className='button'>
								Schedule test
							</Link>
						</div>
					</div>
				</div>
			</header>
			<section
				id='prevention'
				className='prevention-area section-padding'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12 section-title'>
							<h6 className='small-title'>
								Protect Your Life covid-19?
							</h6>
							<h2>Covid-19 Prevention</h2>
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='col-lg-4 col-md-6'>
							<div className='single-prevention'>
								<div className='prevention-icon'>
									<img
										src='./assets/img/prevention-1.png'
										alt='image'
									/>
								</div>
								<div className='prevention-text'>
									<h3>1. Cover Cough</h3>
									<p>
										Lorem Ipsum is simply dummy text of the
										printing and typesetting industry.
									</p>
								</div>
							</div>
						</div>
						<div className='col-lg-4 col-md-6'>
							<div className='single-prevention'>
								<div className='prevention-icon'>
									<img
										src='./assets/img/prevention-2.png'
										alt='image'
									/>
								</div>
								<div className='prevention-text'>
									<h3>2. Wear Mask When go Outside</h3>
									<p>
										Lorem Ipsum is simply dummy text of the
										printing and typesetting industry.
									</p>
								</div>
							</div>
						</div>
						<div className='col-lg-4 col-md-6'>
							<div className='single-prevention'>
								<div className='prevention-icon'>
									<img
										src='./assets/img/prevention-3.png'
										alt='image'
									/>
								</div>
								<div className='prevention-text'>
									<h3>3. Keep Social Distance</h3>
									<p>
										Lorem Ipsum is simply dummy text of the
										printing and typesetting industry.
									</p>
								</div>
							</div>
						</div>
						<div className='col-lg-4 col-md-6'>
							<div className='single-prevention'>
								<div className='prevention-icon'>
									<img
										src='./assets/img/prevention-4.png'
										alt='image'
									/>
								</div>
								<div className='prevention-text'>
									<h3>4. Wash Your Hands regularly</h3>
									<p>
										Lorem Ipsum is simply dummy text of the
										printing and typesetting industry.
									</p>
								</div>
							</div>
						</div>
						<div className='col-lg-4 col-md-6'>
							<div className='single-prevention'>
								<div className='prevention-icon'>
									<img
										src='./assets/img/prevention-5.png'
										alt='image'
									/>
								</div>
								<div className='prevention-text'>
									<h3>5. Don't touch your Face</h3>
									<p>
										Lorem Ipsum is simply dummy text of the
										printing and typesetting industry.
									</p>
								</div>
							</div>
						</div>
						<div className='col-lg-4 col-md-6'>
							<div className='single-prevention'>
								<div className='prevention-icon'>
									<img
										src='././assets/img/prevention-6.png'
										alt='image'
									/>
								</div>
								<div className='prevention-text'>
									<h3>6. Stay At home </h3>
									<p>
										Lorem Ipsum is simply dummy text of the
										printing and typesetting industry.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<footer className='footer-area'>
				<div className='footer-top-area'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-3 col-md-6 footer-link'>
								<div className='footer-logo-box'>
									<h5>Covid 19</h5>
									<p>
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit, sed do eiusmod tempor
										incididunt.
									</p>
									<div className='footer-social-icon'>
										<a href='#' className='icon'>
											{' '}
											<i className='fa fa-facebook' />{' '}
										</a>
										<a href='#' className='icon'>
											{' '}
											<i className='fa fa-twitter' />{' '}
										</a>
										<a href='#' className='icon'>
											{' '}
											<i className='fa fa-dribbble' />{' '}
										</a>
										<a href='#' className='icon'>
											{' '}
											<i className='fa fa-behance' />{' '}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='copyright-area text-center'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-12'>
								<p>Copyright © 2020 - All Right Reserved.</p>
							</div>
						</div>
					</div>
				</div>
				<div className='footer-shape'>
					<div className='footer-shape-1'>
						<img src='./assets/img/covid-shape-1.png' alt='image' />
					</div>
					<div className='footer-shape-2'>
						<img src='./assets/img/covid-shape-1.png' alt='image' />
					</div>
					<div className='footer-shape-3'>
						<img src='./assets/img/covid-shape-1.png' alt='image' />
					</div>
				</div>
			</footer>
		</div>
	);
}
