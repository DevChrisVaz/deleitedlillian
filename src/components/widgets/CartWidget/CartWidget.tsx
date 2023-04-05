import { removeItem, selectCartState } from '@/features/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export interface CartWidgetProps { }

const CartWidget: React.FC<CartWidgetProps> = () => {
	const [totalItems, setTotalItems] = useState<number>(0);
	const [cartTotal, setCartTotal] = useState<number>(0);

	const cartState = useSelector(selectCartState);
	const dispatch = useDispatch();
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
		<div className="sidebar-widget cart-widget">
			<div className="widget-content">
				<h3 className="widget-title">Carrito</h3>

				<div className="shopping-cart">
					<ul className="shopping-cart-items">
						{
							cartState.slice(0, 2).map((item, index) => {
								return (
									<li className="cart-item" key={index}>
										<Image className="thumb" src={process.env.NEXT_PUBLIC_API_URL_PUBLIC + item.product.images[0]} width={300} height={300} alt="" />
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
			</div>
		</div>
	);
};

export default CartWidget;
