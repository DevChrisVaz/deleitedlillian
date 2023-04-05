import React from 'react';
export interface CartWidgetProps { }

const CartWidget: React.FC<CartWidgetProps> = () => {
	return (
		<div className="sidebar-widget cart-widget">
			<div className="widget-content">
				<h3 className="widget-title">Carrito</h3>

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
						<a href="cart.html" className="theme-btn">Ver carrito</a>
						<a href="checkout.html" className="theme-btn">Cotizar</a>
					</div>

				</div>
			</div>
		</div>
	);
};

export default CartWidget;
