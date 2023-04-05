import CreateQuoteUseCase from '@/architecture/application/usecases/quote/CreateQuoteUseCase';
import Quote from '@/architecture/domain/entities/Quote';
import QuoteErrors from '@/architecture/domain/entities/errors/QuoteErrors';
import CreateQuoteException from '@/architecture/domain/exceptions/quote-exceptions/CreateCategoryException';
import QuoteRepo from '@/architecture/infrastructure/implementations/httpRequest/axios/QuoteRepo';
import QuoteValidationsRepo from '@/architecture/infrastructure/implementations/validations/QuoteValidationsRepo';
import { Layout } from '@/components/Layout';
import { clearCart, selectCartState } from '@/features/slices/cartSlice';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export interface CheckoutProps { }

const Checkout: React.FC<CheckoutProps> = () => {
	const [cartTotal, setCartTotal] = useState<number>(0);
	const [initialValues, setInitialValues] = useState<Quote>({
		firstName: "",
		lastName: "",
		address: "",
		addressDetails: "",
		city: "",
		zip: "",
		email: "",
		phone: "",
		details: "",
		products: []
	});
	const [errors, setErrors] = useState<QuoteErrors>({
	});

	const router = useRouter();
	const cartState = useSelector(selectCartState);
	const dispatch = useDispatch();

	const quoteRepo = new QuoteRepo();
	const quoteValidationsRepo = new QuoteValidationsRepo();
	const createQuoteUseCase = new CreateQuoteUseCase(quoteRepo, quoteValidationsRepo);

	const submitCheckoutForm = async (values: Quote) => {
		try {
			const { status } = await createQuoteUseCase.run(values);
			if (status === 201) {
				// await setToastOptions({
				// 	message: "Usuario creado con éxito",
				// 	type: "success"
				// });
				// showResponseToast();
				// navigate(-1);
				dispatch(clearCart());
				router.push("/");
			}
		} catch (err: any) {
			if (err instanceof CreateQuoteException && err.cause) setErrors(err.cause);
			alert("No se pudo solicitar la cotización");
		}
	}

	useEffect(() => {
		let totalPrice = 0;
		let products: any = [];
		cartState.forEach(p => {
			if (p.product.price) totalPrice += (p.product.price * p.qty);
			if (p.product.uuid) products.push({
				product: p.product.uuid,
				qty: p.qty
			});
		});
		setCartTotal(totalPrice);
		setInitialValues({
			...initialValues,
			products
		})
	}, [cartState]);

	return (
		<>
			<Head>
				<title>Cotización</title>
			</Head>
			<Layout>
				<section className="page-title" style={{ backgroundImage: "url(https://via.placeholder.com/1920x400)" }}>
					<div className="auto-container">
						<h1>Cotización</h1>
						<ul className="page-breadcrumb">
							<li><Link href="/">Inicio</Link></li>
							<li>Cotización</li>
						</ul>
					</div>
				</section>
				<section className="checkout-page">
					<div className="auto-container">

						{/* <div className="default-links">
							<div className="message-box with-icon info"><div className="icon-box"><span className="icon fa fa-info"></span></div> Have a coupon? <a href="#">Click here to enter your code</a></div>
						</div> */}


						<div className="checkout-form">
							<form method="post" action="checkout.html">
								<div className="row clearfix">

									<div className="column col-lg-6 col-md-12 col-sm-12">
										<div className="inner-column">
											<div className="sec-title">
												<h3>Detalles de cotización</h3>
											</div>


											<div className="form-group">
												<div className="field-label">Nombre <sup>*</sup></div>
												<input type="text" name="field-name" value="" placeholder="" />
											</div>


											<div className="form-group">
												<div className="field-label">Apellido <sup>*</sup></div>
												<input type="text" name="field-name" value="" placeholder="" />
											</div>


											{/* <div className="form-group">
												<div className="field-label">Company name (optional)</div>
												<input type="text" name="field-name" value="" placeholder="" />
											</div> */}


											{/* <div className="form-group">
												<div className="field-label">Country <sup>*</sup></div>
												<select name="billing_country" className="select2 sortby-select" autocomplete="country">
													<option value="">Select a country&hellip;</option>
													<option value="AX" >&#197;land Islands</option>
													<option value="AF" >Afghanistan</option>
													<option value="AL" >Albania</option>
													<option value="DZ" >Algeria</option>
													<option value="AS" >American Samoa</option>
													<option value="AD" >Andorra</option>
													<option value="AO" >Angola</option>
													<option value="AI" >Anguilla</option>
													<option value="AQ" >Antarctica</option>
													<option value="AG" >Antigua and Barbuda</option>
													<option value="AR" >Argentina</option>
													<option value="AM" >Armenia</option>
													<option value="AW" >Aruba</option>
													<option value="AU" >Australia</option>
													<option value="AT" >Austria</option>
													<option value="AZ" >Azerbaijan</option>
													<option value="BS" >Bahamas</option>
													<option value="BH" >Bahrain</option>
													<option value="BD" >Bangladesh</option>
													<option value="BB" >Barbados</option>
													<option value="BY" >Belarus</option>
													<option value="PW" >Belau</option>
													<option value="BE" >Belgium</option>
													<option value="BZ" >Belize</option>
													<option value="BJ" >Benin</option>
													<option value="BM" >Bermuda</option>
													<option value="BT" >Bhutan</option>
													<option value="BO" >Bolivia</option>
													<option value="BQ" >Bonaire, Saint Eustatius and Saba</option>
													<option value="BA" >Bosnia and Herzegovina</option>
													<option value="BW" >Botswana</option>
													<option value="BV" >Bouvet Island</option>
													<option value="BR" >Brazil</option>
													<option value="IO" >British Indian Ocean Territory</option>
													<option value="VG" >British Virgin Islands</option>
													<option value="BN" >Brunei</option>
													<option value="BG" >Bulgaria</option>
													<option value="BF" >Burkina Faso</option>
													<option value="BI" >Burundi</option>
													<option value="KH" >Cambodia</option>
													<option value="CM" >Cameroon</option>
													<option value="CA" >Canada</option>
													<option value="CV" >Cape Verde</option>
													<option value="KY" >Cayman Islands</option>
													<option value="CF" >Central African Republic</option>
													<option value="TD" >Chad</option>
													<option value="CL" >Chile</option>
													<option value="CN" >China</option>
													<option value="CX" >Christmas Island</option>
													<option value="CC" >Cocos (Keeling) Islands</option>
													<option value="CO" >Colombia</option>
													<option value="KM" >Comoros</option>
													<option value="CG" >Congo (Brazzaville)</option>
													<option value="CD" >Congo (Kinshasa)</option>
													<option value="CK" >Cook Islands</option>
													<option value="CR" >Costa Rica</option>
													<option value="HR" >Croatia</option>
													<option value="CU" >Cuba</option>
													<option value="CW" >Cura&ccedil;ao</option>
													<option value="CY" >Cyprus</option>
													<option value="CZ" >Czech Republic</option>
													<option value="DK" >Denmark</option>
													<option value="DJ" >Djibouti</option>
													<option value="DM" >Dominica</option>
													<option value="DO" >Dominican Republic</option>
													<option value="EC" >Ecuador</option>
													<option value="EG" >Egypt</option>
													<option value="SV" >El Salvador</option>
													<option value="GQ" >Equatorial Guinea</option>
													<option value="ER" >Eritrea</option>
													<option value="EE" >Estonia</option>
													<option value="ET" >Ethiopia</option>
													<option value="FK" >Falkland Islands</option>
													<option value="FO" >Faroe Islands</option>
													<option value="FJ" >Fiji</option>
													<option value="FI" >Finland</option>
													<option value="FR" >France</option>
													<option value="GF" >French Guiana</option>
													<option value="PF" >French Polynesia</option>
													<option value="TF" >French Southern Territories</option>
													<option value="GA" >Gabon</option>
													<option value="GM" >Gambia</option>
													<option value="GE" >Georgia</option>
													<option value="DE" >Germany</option>
													<option value="GH" >Ghana</option>
													<option value="GI" >Gibraltar</option>
													<option value="GR" >Greece</option>
													<option value="GL" >Greenland</option>
													<option value="GD" >Grenada</option>
													<option value="GP" >Guadeloupe</option>
													<option value="GU" >Guam</option>
													<option value="GT" >Guatemala</option>
													<option value="GG" >Guernsey</option>
													<option value="GN" >Guinea</option>
													<option value="GW" >Guinea-Bissau</option>
													<option value="GY" >Guyana</option>
													<option value="HT" >Haiti</option>
													<option value="HM" >Heard Island and McDonald Islands</option>
													<option value="HN" >Honduras</option>
													<option value="HK" >Hong Kong</option>
													<option value="HU" >Hungary</option>
													<option value="IS" >Iceland</option>
													<option value="IN" >India</option>
													<option value="ID" >Indonesia</option>
													<option value="IR" >Iran</option>
													<option value="IQ" >Iraq</option>
													<option value="IE" >Ireland</option>
													<option value="IM" >Isle of Man</option>
													<option value="IL" >Israel</option>
													<option value="IT" >Italy</option>
													<option value="CI" >Ivory Coast</option>
													<option value="JM" >Jamaica</option>
													<option value="JP" >Japan</option>
													<option value="JE" >Jersey</option>
													<option value="JO" >Jordan</option>
													<option value="KZ" >Kazakhstan</option>
													<option value="KE" >Kenya</option>
													<option value="KI" >Kiribati</option>
													<option value="KW" >Kuwait</option>
													<option value="KG" >Kyrgyzstan</option>
													<option value="LA" >Laos</option>
													<option value="LV" >Latvia</option>
													<option value="LB" >Lebanon</option>
													<option value="LS" >Lesotho</option>
													<option value="LR" >Liberia</option>
													<option value="LY" >Libya</option>
													<option value="LI" >Liechtenstein</option>
													<option value="LT" >Lithuania</option>
													<option value="LU" >Luxembourg</option>
													<option value="MO" >Macao S.A.R., China</option>
													<option value="MK" >Macedonia</option>
													<option value="MG" >Madagascar</option>
													<option value="MW" >Malawi</option>
													<option value="MY" >Malaysia</option>
													<option value="MV" >Maldives</option>
													<option value="ML" >Mali</option>
													<option value="MT" >Malta</option>
													<option value="MH" >Marshall Islands</option>
													<option value="MQ" >Martinique</option>
													<option value="MR" >Mauritania</option>
													<option value="MU" >Mauritius</option>
													<option value="YT" >Mayotte</option>
													<option value="MX" >Mexico</option>
													<option value="FM" >Micronesia</option>
													<option value="MD" >Moldova</option>
													<option value="MC" >Monaco</option>
													<option value="MN" >Mongolia</option>
													<option value="ME" >Montenegro</option>
													<option value="MS" >Montserrat</option>
													<option value="MA" >Morocco</option>
													<option value="MZ" >Mozambique</option>
													<option value="MM" >Myanmar</option>
													<option value="NA" >Namibia</option>
													<option value="NR" >Nauru</option>
													<option value="NP" >Nepal</option>
													<option value="NL" >Netherlands</option>
													<option value="NC" >New Caledonia</option>
													<option value="NZ" >New Zealand</option>
													<option value="NI" >Nicaragua</option>
													<option value="NE" >Niger</option>
													<option value="NG" >Nigeria</option>
													<option value="NU" >Niue</option>
													<option value="NF" >Norfolk Island</option>
													<option value="KP" >North Korea</option>
													<option value="MP" >Northern Mariana Islands</option>
													<option value="NO" >Norway</option>
													<option value="OM" >Oman</option>
													<option value="PK" selected='selected'>Pakistan</option>
													<option value="PS" >Palestinian Territory</option>
													<option value="PA" >Panama</option>
													<option value="PG" >Papua New Guinea</option>
													<option value="PY" >Paraguay</option>
													<option value="PE" >Peru</option>
													<option value="PH" >Philippines</option>
													<option value="PN" >Pitcairn</option>
													<option value="PL" >Poland</option>
													<option value="PT" >Portugal</option>
													<option value="PR" >Puerto Rico</option>
													<option value="QA" >Qatar</option>
													<option value="RE" >Reunion</option>
													<option value="RO" >Romania</option>
													<option value="RU" >Russia</option>
													<option value="RW" >Rwanda</option>
													<option value="ST" >S&atilde;o Tom&eacute; and Pr&iacute;ncipe</option>
													<option value="BL" >Saint Barth&eacute;lemy</option>
													<option value="SH" >Saint Helena</option>
													<option value="KN" >Saint Kitts and Nevis</option>
													<option value="LC" >Saint Lucia</option>
													<option value="SX" >Saint Martin (Dutch part)</option>
													<option value="MF" >Saint Martin (French part)</option>
													<option value="PM" >Saint Pierre and Miquelon</option>
													<option value="VC" >Saint Vincent and the Grenadines</option>
													<option value="WS" >Samoa</option>
													<option value="SM" >San Marino</option>
													<option value="SA" >Saudi Arabia</option>
													<option value="SN" >Senegal</option>
													<option value="RS" >Serbia</option>
													<option value="SC" >Seychelles</option>
													<option value="SL" >Sierra Leone</option>
													<option value="SG" >Singapore</option>
													<option value="SK" >Slovakia</option>
													<option value="SI" >Slovenia</option>
													<option value="SB" >Solomon Islands</option>
													<option value="SO" >Somalia</option>
													<option value="ZA" >South Africa</option>
													<option value="GS" >South Georgia/Sandwich Islands</option>
													<option value="KR" >South Korea</option>
													<option value="SS" >South Sudan</option>
													<option value="ES" >Spain</option>
													<option value="LK" >Sri Lanka</option>
													<option value="SD" >Sudan</option>
													<option value="SR" >Suriname</option>
													<option value="SJ" >Svalbard and Jan Mayen</option>
													<option value="SZ" >Swaziland</option>
													<option value="SE" >Sweden</option>
													<option value="CH" >Switzerland</option>
													<option value="SY" >Syria</option>
													<option value="TW" >Taiwan</option>
													<option value="TJ" >Tajikistan</option>
													<option value="TZ" >Tanzania</option>
													<option value="TH" >Thailand</option>
													<option value="TL" >Timor-Leste</option>
													<option value="TG" >Togo</option>
													<option value="TK" >Tokelau</option>
													<option value="TO" >Tonga</option>
													<option value="TT" >Trinidad and Tobago</option>
													<option value="TN" >Tunisia</option>
													<option value="TR" >Turkey</option>
													<option value="TM" >Turkmenistan</option>
													<option value="TC" >Turks and Caicos Islands</option>
													<option value="TV" >Tuvalu</option>
													<option value="UG" >Uganda</option>
													<option value="UA" >Ukraine</option>
													<option value="AE" >United Arab Emirates</option>
													<option value="GB" >United Kingdom (UK)</option>
													<option value="US" >United States (US)</option>
													<option value="UM" >United States (US) Minor Outlying Islands</option>
													<option value="VI" >United States (US) Virgin Islands</option>
													<option value="UY" >Uruguay</option>
													<option value="UZ" >Uzbekistan</option>
													<option value="VU" >Vanuatu</option>
													<option value="VA" >Vatican</option>
													<option value="VE" >Venezuela</option>
													<option value="VN" >Vietnam</option>
													<option value="WF" >Wallis and Futuna</option>
													<option value="EH" >Western Sahara</option>
													<option value="YE" >Yemen</option>
													<option value="ZM" >Zambia</option><option value="ZW" >Zimbabwe</option>
												</select>
											</div> */}


											<div className="form-group">
												<div className="field-label">Dirección <sup>*</sup></div>
												<input type="text" name="field-name" value="" placeholder="Calle número de casa colonia" />
											</div>

											<div className="form-group">
												<input type="text" name="field-name" value="" placeholder="Número interior" />
											</div>


											<div className="form-group">
												<div className="field-label">Ciudad <sup>*</sup></div>
												<input type="text" name="field-name" value="" placeholder="" required />
											</div>


											{/* <div className="form-group">
												<div className="field-label">State / County <sup>*</sup></div>
												<input type="text" name="field-name" value="" placeholder="" required />
											</div> */}


											<div className="form-group">
												<div className="field-label">Código postal <sup>*</sup></div>
												<input type="text" name="field-name" value="" placeholder="" required />
											</div>


											<div className="form-group">
												<div className="field-label">Celular</div>
												<input type="text" name="field-name" value="" placeholder="" />
											</div>


											<div className="form-group">
												<div className="field-label">Dirección de correo</div>
												<input type="text" name="field-name" value="" placeholder="" />
											</div>
										</div>
									</div>


									<div className="column col-lg-6 col-md-12 col-sm-12">
										<div className="inner-column">
											<div className="sec-title">
												<h3>Información adicional</h3>
											</div>


											<div className="form-group ">
												<div className="field-label">Instrucciones adicionales (optional)</div>
												<textarea className="" placeholder="Notes about your order,e.g. special notes for delivery." ></textarea>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>

						<div className="order-box">
							<table>
								<thead>
									<tr>
										<th className="product-name">Producto</th>
										<th className="product-total">Total</th>
									</tr>
								</thead>
								<tbody>
									{
										cartState.length > 0 && cartState.map((item, index) => {
											return (
												<tr className="cart-item" key={index}>
													<td className="product-name">{item.product.name}&nbsp;
														<strong className="product-quantity">× {item.qty}</strong>
													</td>
													<td className="product-total">
														<span className="woocommerce-Price-amount amount">{numeral((item.product.price ?? 0) * item.qty).format("$0,0.00")}</span>
													</td>
												</tr>
											)
										})
									}
								</tbody>
								<tfoot>
									<tr className="cart-subtotal">
										<th>Subtotal</th>
										<td><span className="amount">{numeral(cartTotal).format("$0,0.00")}</span></td>
									</tr>
									<tr className="order-total">
										<th>Total</th>
										<td><strong className="amount">{numeral(cartTotal).format("$0,0.00")}</strong> </td>
									</tr>
								</tfoot>
							</table>
						</div>



						<div className="payment-box">
							<div className="upper-box">

								<div className="payment-options">
									<ul>
										<li>
											<div className="radio-option">
												<input type="radio" name="payment-group" id="payment-2" checked />
												<label htmlFor="payment-2"><strong>Direct Bank Transfer</strong><span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</span></label>
											</div>
										</li>
										<li>
											<div className="radio-option">
												<input type="radio" name="payment-group" id="payment-1" />
												<label htmlFor="payment-1"><strong>Check Payments</strong><span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</span></label>
											</div>
										</li>

										<li>
											<div className="radio-option">
												<input type="radio" name="payment-group" id="payment-3" />
												<label htmlFor="payment-3"><strong>Cash on Delivery</strong><span className="small-text">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</span></label>
											</div>
										</li>
									</ul>
									<div className="text">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#">privacy policy.</a></div>
								</div>
							</div>
							<div className="lower-box">
								<a href="#" className="theme-btn"><span className="btn-title">Cotizar</span></a>
							</div>
						</div>

					</div>
				</section>
			</Layout>
		</>
	);
};

export default Checkout;
