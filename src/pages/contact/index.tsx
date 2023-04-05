import { Layout } from '@/components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
export interface ContactProps { }

const Contact: React.FC<ContactProps> = () => {
	return (
		<>
			<Head>
				<title>Contacto</title>
			</Head>
			<Layout>
				<section className="page-title" style={{ backgroundImage: "url(https://via.placeholder.com/1920x400)" }}>
					<div className="auto-container">
						<h1>Contacto</h1>
						<ul className="page-breadcrumb">
							<li><Link href="/">Inicio</Link></li>
							<li>Contacto</li>
						</ul>
					</div>
				</section>
				<section className="contact-section">
					<div className="auto-container">
						<div className="sec-title text-center">
							<div className="divider"><img src="images/icons/divider_1.png" alt="" /></div>
							<h2>Contacto</h2>
							<div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nisi et dolor ornare pellentesque. Nullam porttitor,<br /> odio id facilisis, mauris dolor rhoncus elit, ultricies nulla eros at dui. In suscipit leo sagittis aliquam.</div>
						</div>

						<div className="row clearfix">
							<div className="column col-xl-3 col-lg-6 col-md-6 col-sm-12">
								<div className="inner-column">
									<div className="title">
										<div className="icon"><img src="assets/images/icons/icon-devider-gray.png" alt="" /></div>
										<h4>Horario</h4>
									</div>

									<ul className="contact-info">
										<li>Lunes – Viernes <br />08:00 a.m. – 08:30 p.m.</li>
										<li>Sábado <br />08:00 – 04:30 p.m.</li>
										<li>Domingo <br />10:00 a.m. - 04:30 p.m.</li>
									</ul>
								</div>
							</div>

							<div className="column col-xl-3 col-lg-6 col-md-6 col-sm-12 order-3">
								<div className="inner-column">
									<div className="title">
										<div className="icon"><img src="assets/images/icons/icon-devider-gray.png" alt="" /></div>
										<h4>Contactos</h4>
									</div>

									<ul className="contact-info">
										<li>Calle 123 No. 709 Cerrada Arboleda C.P 97314, Caucel, Yucatán.</li>
										<li><a href="tel:529993893779">+52 999-389-3779</a></li>
										<li><a href="mailto:deleitelzt@gmail.com">deleitelzt@gmail.com</a></li>
									</ul>
								</div>
							</div>

							<div className="column col-xl-6 col-lg-12 col-md-12 col-sm-12">
								<div className="inner-column">
									<div className="title">
										<div className="icon"><img src="assets/images/icons/icon-devider-gray.png" alt="" /></div>
										<h4>Envíanos un mensaje</h4>
									</div>
									<div className="contact-form">
										<form action="#" method="post" id="email-form">

											<div className="form-group">
												<div className="response"></div>
											</div>

											<div className="form-group">
												<input type="text" name="username" className="username" placeholder="Nombre *" />
											</div>

											<div className="form-group">
												<input type="email" name="email" className="email" placeholder="Correo *" />
											</div>

											<div className="form-group">
												<textarea name="contact_message" placeholder="Contenido"></textarea>
											</div>

											<div className="form-group">
												<button className="theme-btn" type="button" id="submit" name="submit-form">Enviar</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="map-section">
					<iframe id="gmap_canvas" src="https://www.google.com.mx/maps/embed?pb=!1m18!1m12!1m3!1d939.8240993739833!2d-89.70453841788654!3d20.981653061574032!2m3!1f0!2f19.000000000000007!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f560cb3c3a7a477%3A0xa16dfce83140372a!2sC.%20123%2C%2097314%20Yuc.!5e0!3m2!1sen!2smx!4v1648259286217!5m2!1sen!2smx"></iframe>
				</section>
			</Layout>
		</>
	);
};

export default Contact;
