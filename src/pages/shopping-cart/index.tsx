import { Layout } from '@/components/Layout';
import { changeProductQty, decreaseProductQty, increaseProductQty, removeItem, selectCartState } from '@/features/slices/cartSlice';
import useImage from '@/hooks/useImage';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export interface ShoppingCartProps { }

const ShoppingCart: React.FC<ShoppingCartProps> = () => {
	const [cartTotal, setCartTotal] = useState<number>(0);

	const router = useRouter();
	const dispatch = useDispatch();
	const cart = useSelector(selectCartState);
	const image = useImage();

	const handleRemoveFromCart = (productId: string) => {
		dispatch(removeItem(productId));
	}

	const handleChangeQty = (productId: string, qty: string) => {
		dispatch(changeProductQty({ uuid: productId, qty: parseInt(qty) }));
	}

	useEffect(() => {
		let totalPrice: number = 0;
		cart.forEach(p => {
			if (p.product.price) totalPrice += (p.product.price * p.qty);
		});
		setCartTotal(totalPrice);
	}, [cart]);

	return (
		<>
			<Head>
				<title>Carrito</title>
			</Head>
			<Layout>
				<section className="page-title" style={{ backgroundImage: "url(https://via.placeholder.com/1920x400)" }}>
					<div className="auto-container">
						<h1>Carrito</h1>
						<ul className="page-breadcrumb">
							<li><Link href="/">Inicio</Link></li>
							<li>Carrito</li>
						</ul>
					</div>
				</section>
				<section className="cart-section">
					<div className="auto-container">

						<div className="cart-outer">
							<div className="table-outer">
								<table className="cart-table">
									<thead className="cart-header">
										<tr>
											<th className="product-thumbnail">&nbsp;</th>
											<th className="product-name">Producto</th>
											<th className="product-price">Precio</th>
											<th className="product-quantity">Cantidad</th>
											<th className="product-subtotal">Total</th>
											<th className="product-remove">&nbsp;</th>
										</tr>
									</thead>
									<tbody>
										{
											cart.length > 0 &&
											cart.map((item, index) => {
												return (
													<tr className="cart-item" key={index}>
														<td className="product-thumbnail"><a href="shop-single.html"><Image src={image(process.env.NEXT_PUBLIC_API_URL_PUBLIC + item.product.images[0])} width={300} height={300} alt="" /></a></td>
														<td className="product-name"><a href="shop-single.html">{item.product.name}</a></td>
														<td className="product-price">{numeral(item.product.price).format("$0,0.00")}</td>
														<td className="product-quantity"><div className="quantity"><label>Cantidad</label><input type="number" className="qty" name="qty" value={item.qty} onChange={(e) => handleChangeQty(item.product.uuid ?? "", e.target.value)} /> </div></td>
														<td className="product-subtotal"><span className="amount">{numeral((item.product.price ?? 0) * item.qty).format("$0,0.00")}</span></td>
														<td className="product-remove"> <a className="remove" onClick={() => handleRemoveFromCart(item.product.uuid ?? "")} style={{ cursor: "pointer" }}><span className="fa fa-times"></span></a></td>
													</tr>
												)
											})
										}
									</tbody>
								</table>
							</div>

							<div className="cart-options clearfix">
								<div className="pull-left" style={{ visibility: "hidden" }}>
									<div className="apply-coupon clearfix">
										<div className="form-group clearfix">
											<input type="text" name="coupon-code" value="" placeholder="Coupon Code" />
										</div>
										<div className="form-group clearfix">
											<button type="button" className="theme-btn coupon-btn">Apply Coupon</button>
										</div>
									</div>
								</div>

								<div className="pull-right">
									<button type="button" className="theme-btn cart-btn">Seguir cotizando</button>
								</div>
							</div>
						</div>

						<div className="row justify-content-between">
							<div className="column col-lg-4 offset-lg-8 col-md-6 col-sm-12">

								<ul className="totals-table">
									<li><h3>Total del carrito</h3></li>
									<li className="clearfix"><span className="col">Subtotal</span><span className="col price">{numeral(cartTotal).format("$0,0.00")}</span></li>
									<li className="clearfix"><span className="col">Total</span><span className="col total-price">{numeral(cartTotal).format("$0,0.00")}</span></li>
									{
										cart.length > 0 &&
										<li className="text-right"><button type="button" onClick={() => router.push("/checkout")} className="theme-btn proceed-btn">Proceder a cotizar</button></li>
									}
								</ul>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};

export default ShoppingCart;
