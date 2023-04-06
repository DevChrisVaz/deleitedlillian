import { removeItem, selectCartState } from '@/features/slices/cartSlice';
import useImage from '@/hooks/useImage';
import Image from 'next/image';
import Link from 'next/link';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = () => {
	const [totalItems, setTotalItems] = useState<number>(0);
	const [cartTotal, setCartTotal] = useState<number>(0);

	const cartState = useSelector(selectCartState);
	const dispatch = useDispatch();
	const image = useImage();
	// const cartTotal = useSelector(selectCartTotal);

	const handleRemoveFromCart = (productId: string) => {
		dispatch(removeItem(productId));
	}

	useEffect(() => {
		let total: number = 0;
		let totalPrice: number = 0;
		cartState.forEach(p => {
			total += p.qty;
			if (p.product.price) totalPrice += (p.product.price * p.qty);
		});
		setTotalItems(total);
		setCartTotal(totalPrice);
	}, [cartState]);

	return (
		<header className="main-header">

			<div className="menu_wave"></div>

			<div className="main-box">
				<div className="menu-box">
					<div className="logo"><a href="index.html"><Image src="/assets/images/logos/logo-deleite-cafe_oscuro.png" width={190} height={100} alt="" title="" /></a></div>

					<div className="nav-outer clearfix">

						<nav className="main-menu navbar-expand-md navbar-light">
							<div className="collapse navbar-collapse clearfix" id="navbarSupportedContent">
								<ul className="navigation menu-left clearfix">
									<li><Link href="/">Inicio</Link></li>
									<li><Link href="/about">Conócenos</Link></li>
								</ul>

								<ul className="navigation menu-right clearfix">
									<li><Link href="/shop">Tienda</Link></li>
									<li><Link href="/contact">Contacto</Link></li>
								</ul>
							</div>
						</nav>


						<div className="outer-box clearfix">

							<div className="cart-btn">
								<Link href="shopping-cart"><i className="icon flaticon-commerce"></i> {totalItems > 0 && <span className="count">{totalItems}</span>} </Link>
								{
									cartState.length > 0 &&
									<div className="shopping-cart">
										<ul className="shopping-cart-items">
											{
												cartState.slice(0, 2).map((item, index) => {
													return (
														<li className="cart-item" key={index}>
															<Image className="thumb" src={image(process.env.NEXT_PUBLIC_API_URL_PUBLIC + item.product.images[0])} width={300} height={300} alt="" />
															{/* <img src={} alt="#" className="thumb" /> */}
															<span className="item-name">{item.product.name}</span>
															<span className="item-quantity">{item.qty} x <span className="item-amount">{numeral(item.product.price).format("$0,0.00")}</span></span>
															<Link href={"/product-details?id=" + item.product.uuid} className="product-detail"></Link>
															<button className="remove-item" onClick={() => handleRemoveFromCart(item.product.uuid ?? "")}><span className="fa fa-times"></span></button>
														</li>
													)
												})
											}
										</ul>

										<div className="cart-footer">
											<div className="shopping-cart-total"><strong>Subtotal:</strong> {numeral(cartTotal).format("$0,0.00")}</div>
											<Link href="/shopping-cart" className="theme-btn">Ver carrito</Link>
											<Link href="/checkout" className="theme-btn">Cotizar</Link>
										</div>
									</div>
								}

							</div>


							{/* <div className="search-box">
								<button className="search-btn"><i className="fa fa-search"></i></button>
							</div> */}
						</div>
					</div>
				</div>
			</div>

			<div className="sticky-header">
				<div className="auto-container clearfix">

					<div className="logo">
						<Link href="/" title="Sticky Logo"><img src="assets/images/logo-small.png" alt="Sticky Logo" /></Link>
					</div>


					<div className="nav-outer">
						<div className="mobile-nav-toggler"><span className="icon flaticon-menu"></span></div>

						<nav className="main-menu">

						</nav>
					</div>
				</div>
			</div>

			<div className="sticky-header">
				<div className="auto-container clearfix">

					<div className="logo">
						<Link href="/" title="Sticky Logo"><Image src="/assets/images/logos/logo-deleite-cafe_oscuro_small.png" width={190} height={100} alt="Sticky Logo" /></Link>
					</div>


					<div className="nav-outer">
						<div className="mobile-nav-toggler"><span className="icon flaticon-menu"></span></div>

						<nav className="main-menu">

						</nav>
					</div>
				</div>
			</div>

			<div className="mobile-header">
				<div className="logo"><a href="index.html"><Image src="/assets/images/logos/logo-deleite-cafe_oscuro_small.png" width={100} height={100} alt="" title="" /></a></div>


				<div className="nav-outer clearfix">

				</div>
			</div>


			<div className="mobile-menu">
				<nav className="menu-box">
					<div className="nav-logo"><a href="index.html"><Image src="/assets/images/logos/logo-deleite-cafe_oscuro_small.png" width={100} height={100} alt="" title="" /></a></div>

				</nav>
			</div>


			<div className="search-popup">
				<span className="search-back-drop"></span>

				<div className="search-inner">
					<button className="close-search"><span className="fa fa-times"></span></button>
					<form method="post" action="blog-showcase.html">
						<div className="form-group">
							<input type="search" name="search-field" value="" placeholder="Search..." required />
							<button type="submit"><i className="fa fa-search"></i></button>
						</div>
					</form>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
