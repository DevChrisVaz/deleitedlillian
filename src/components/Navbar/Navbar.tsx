import { selectCartState } from '@/features/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = () => {
	const [totalItems, setTotalItems] = useState<number>(0);
	const [cartTotal, setCartTotal] = useState<number>(0);

	const cartState = useSelector(selectCartState);
	// const cartTotal = useSelector(selectCartTotal);

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

								<div className="shopping-cart">
									<ul className="shopping-cart-items">
										<li className="cart-item">
											<img src="https://via.placeholder.com/300x300" alt="#" className="thumb" />
											<span className="item-name">Birthday Cake</span>
											<span className="item-quantity">1 x <span className="item-amount">$84.00</span></span>
											<a href="shop-single.html" className="product-detail"></a>
											<button className="remove-item"><span className="fa fa-times"></span></button>
										</li>

										<li className="cart-item">
											<img src="https://via.placeholder.com/300x300" alt="#" className="thumb" />
											<span className="item-name">French Macaroon</span>
											<span className="item-quantity">1 x <span className="item-amount">$13.00</span></span>
											<a href="shop-single.html" className="product-detail"></a>
											<button className="remove-item"><span className="fa fa-times"></span></button>
										</li>
									</ul>

									<div className="cart-footer">
										<div className="shopping-cart-total"><strong>Subtotal:</strong> $97.00</div>
										<a href="cart.html" className="theme-btn">View Cart</a>
										<a href="checkout.html" className="theme-btn">Checkout</a>
									</div>
								</div>
							</div>


							{/* <div className="search-box">
								<button className="search-btn"><i className="fa fa-search"></i></button>
							</div> */}
						</div>
					</div>
				</div>
			</div>

			{/* <div className="sticky-header">
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
			</div> */}

			<div className="mobile-header">
				<div className="logo"><a href="index.html"><img src="assets/images/logo-small.png" alt="" title="" /></a></div>


				<div className="nav-outer clearfix">

				</div>
			</div>


			<div className="mobile-menu">
				<nav className="menu-box">
					<div className="nav-logo"><a href="index.html"><img src="assets/images/logo-small.png" alt="" title="" /></a></div>

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
