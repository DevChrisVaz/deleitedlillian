import GetProductByIdUseCase from '@/architecture/application/usecases/product/GetProductByIdUseCase';
import GetRelatedProductsUseCase from '@/architecture/application/usecases/product/GetRelatedProductsUseCase';
import IncreaseProductViewsUseCase from '@/architecture/application/usecases/product/IncreaseProductViewsUseCase';
import Product from '@/architecture/domain/entities/Product';
import ProductRepo from '@/architecture/infrastructure/implementations/httpRequest/axios/ProductRepo';
import { Layout } from '@/components/Layout';
import { ProductPreview } from '@/components/ProductPreview';
import { CartWidget } from '@/components/widgets/CartWidget';
import { addItem, changeProductQty, decreaseProductQty, increaseProductQty, removeItem, selectCartState } from '@/features/slices/cartSlice';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export interface ProductDetailsProps { }

const ProductDetails: React.FC<ProductDetailsProps> = () => {
	const [product, setProduct] = useState<Product>();
	const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const productRepo = new ProductRepo();
	const getProductByIdUseCase = new GetProductByIdUseCase(productRepo);
	const getRelatedProductsUseCase = new GetRelatedProductsUseCase(productRepo);
	const increaseProductViewsUseCase = new IncreaseProductViewsUseCase(productRepo);

	const bigImgRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const dispatch = useDispatch();
	const cart = useSelector(selectCartState);

	const { id } = router.query;

	const handleIncreaseQty = () => {
		dispatch(increaseProductQty(product?.uuid));
	}

	const handleDecreaseQty = () => {
		dispatch(decreaseProductQty(product?.uuid));
	}

	const handleAddToCart = () => {
		dispatch(addItem(product));
	}

	const handleRemoveFromCart = () => {
		dispatch(removeItem(product?.uuid));
	}

	const isInCart = (): boolean => {
		if (cart.find(i => i.product.uuid === product?.uuid)?.qty) return true;
		return false;
	}

	const getProduct = async () => {
		try {
			setLoading(true);
			if (id) {
				const { data, status } = await getProductByIdUseCase.run(Array.isArray(id) ? id[0] : id);
				if (status === 200) {
					setProduct(data);
					console.log(data)
					await increaseProductViewsUseCase.run(Array.isArray(id) ? id[0] : id);
				}
				setLoading(false);
			} else {
				throw new Error("No se proporcionó un id");
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	const getRelatedProducts = async (id: string) => {
		try {
			const { data, status } = await getRelatedProductsUseCase.run(id);
			if (status === 200 && data) setRelatedProducts(data);
		} catch (err) {

		}
	}

	useEffect(() => {
		getProduct();
		//eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		getRelatedProducts(id ? Array.isArray(id) ? id[0] : id : "");
		//eslint-disable-next-line
	}, [product]);

	return (
		<>
			<Head>
				<title>Detalles de producto</title>
			</Head>
			<Layout>
				<section className="page-title" style={{ backgroundImage: "url(https://via.placeholder.com/1920x400)" }}>
					<div className="auto-container">
						<h1>{product?.name}</h1>
						<ul className="page-breadcrumb">
							<li><Link href="/">Inicio</Link></li>
							<li><Link href="/shop">Tienda</Link></li>
							<li>{product?.name}</li>
						</ul>
					</div>
				</section>
				<div className="sidebar-page-container">
					<div className="auto-container">
						<div className="row clearfix">


							<div className="content-side col-lg-9 col-md-12 col-sm-12">
								<div className="shop-single">

									<div className="product-details">

										<div className="basic-details">
											<div className="row clearfix">
												<div className="image-column col-md-6 col-sm-12">
													<figure className="image"><a href="https://via.placeholder.com/1000x1000" className="lightbox-image" title="Image Caption Here"><Image src={process.env.NEXT_PUBLIC_API_URL_PUBLIC + product?.images[0]} width={1000} height={1000} alt="" />{/* <span className="icon fa fa-search"></span> */}</a></figure>
												</div>
												<div className="info-column col-md-6 col-sm-12">
													<div className="details-header">
														<h4>{product?.name}</h4>
														<div className="rating">
															<span className="fa fa-star"></span>
															<span className="fa fa-star"></span>
															<span className="fa fa-star"></span>
															<span className="fa fa-star"></span>
															<span className="fa fa-star"></span>
														</div>
														<a className="reviews" href="#">(2 opiniones de clientes)</a>
														<div className="item-price">{numeral(product?.price ?? 0).format("$0,0.00")}</div>
														<div className="text">Accumsan lectus, consectetuer et sagittis et commodo, massa et, sed facilisi mi, sit diam. Ultrices facilisi convallis nullam duis. Aliquam lacinia orci convallis erat ac, vitae neque in className.</div>
													</div>

													<div className="other-options clearfix">
														{
															!isInCart() ?
																<button type="button" onClick={handleAddToCart} className="theme-btn add-to-cart"><span className="btn-title">Agregar al carrito</span></button>
																:
																<>
																	<div className="item-quantity">Cantidad <input className="qty" type="number" value={cart.find(i => i.product.uuid === product?.uuid)?.qty} onChange={(e) => dispatch(changeProductQty({ uuid: product?.uuid, qty: e.target.value }))} min={1} name="quantity" /></div>
																	<button type="button" onClick={handleRemoveFromCart} className="theme-btn add-to-cart"><span className="btn-title">Quitar al carrito</span></button>
																</>
														}
														<ul className="product-meta">
															<li className="posted_in">Categorías: <a href="#">{product?.categoryRef.name}</a></li>
															<li className="tagged_as">Tags: {
																product?.tagsRef && product?.tagsRef.length > 0 && product?.tagsRef.map((tag, index) => {
																	return <a key={index}>{(tag.name ?? "") + (index !== product?.tagsRef.length - 1 ? ", " : "")}</a>
																}
																)}
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>



										<div className="product-info-tabs">

											<div className="prod-tabs tabs-box">


												<ul className="tab-btns tab-buttons clearfix">
													<li data-tab="#prod-details" className="tab-btn">Descripción</li>
													<li data-tab="#prod-reviews" className="tab-btn active-btn">Opiniones (2)</li>
												</ul>


												<div className="tabs-content">


													<div className="tab" id="prod-details">
														{/* <h2 className="title">Descripción</h2> */}
														<div className="content">
															<p>{product?.description}</p>
														</div>
													</div>


													<div className="tab active-tab" id="prod-reviews">
														{/* <h2 className="title">2 opiniones sobre Nombre de producto</h2> */}

														<div className="comments-area">

															<div className="comment-box">
																<div className="comment">
																	<div className="author-thumb"><Image src="https://via.placeholder.com/60x60" alt="" width={60} height={60} /></div>
																	<div className="comment-inner">
																		<div className="comment-info clearfix">
																			<strong className="name">Stuart</strong>
																			<span className="date">– 07 Jun</span>
																		</div>
																		<div className="rating">
																			<span className="fa fa-star"></span>
																			<span className="fa fa-star"></span>
																			<span className="fa fa-star"></span>
																			<span className="fa fa-star"></span>
																			<span className="fa fa-star light"></span>
																		</div>
																		<div className="text">This will go great with my Hoodie that I ordered a few weeks ago.</div>
																	</div>
																</div>
															</div>


															<div className="comment-box">
																<div className="comment">
																	<div className="author-thumb"><Image src="https://via.placeholder.com/60x60" alt="" width={60} height={60} /></div>
																	<div className="comment-inner">
																		<div className="comment-info clearfix">
																			<strong className="name">Maria</strong>
																			<span className="date">– 07 Jun</span>
																		</div>
																		<div className="rating">
																			<span className="fa fa-star"></span>
																			<span className="fa fa-star"></span>
																			<span className="fa fa-star"></span>
																			<span className="fa fa-star"></span>
																			<span className="fa fa-star light"></span>
																		</div>
																		<div className="text">Love this shirt! The ninja near and dear to my heart.</div>
																	</div>
																</div>
															</div>
														</div>


														<div className="comment-form">
															<div className="sub-title">Agrega una opinión</div>
															<div className="form-outer">
																<p>Tu correo electrónico no será publicado. Los campos obligatorios están marcados con *</p>
																<div className="rating-box">
																	<div className="field-label">Tu calificación</div>
																	<div className="rating">
																		<a href="#"><span className="fa fa-star"></span></a>
																		<a href="#"><span className="fa fa-star"></span></a>
																		<a href="#"><span className="fa fa-star"></span></a>
																		<a href="#"><span className="fa fa-star"></span></a>
																		<a href="#"><span className="fa fa-star"></span></a>
																	</div>
																</div>
																<form method="post" action="blog-showcase.html">
																	<div className="row clearfix">
																		<div className="col-lg-12 col-md-12 col-sm-12 form-group">
																			<div className="field-label">Tus comentarios *</div>
																			<textarea name="message" placeholder=""></textarea>
																		</div>

																		<div className="col-lg-6 col-md-12 col-sm-12 form-group">
																			<div className="field-label">Nombre *</div>
																			<input type="text" name="username" placeholder="" required />
																		</div>

																		<div className="col-lg-6 col-md-12 col-sm-12 form-group">
																			<div className="field-label">Correo *</div>
																			<input type="email" name="email" placeholder="" required />
																		</div>

																		<div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
																			<input type="submit" name="submit" value="Enviar" />
																		</div>
																	</div>
																</form>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>



										{
											relatedProducts.length > 0 &&
											<div className="related-products">
												<div className="sec-title">
													<h2>Productos relacionados</h2>
												</div>

												<div className="row clearfix">
													{
														relatedProducts.map((product, index) => {
															return (
																<ProductPreview product={product} key={index} />
															)
														})
													}
												</div>
											</div>
										}
									</div>
								</div>
							</div>


							<div className="sidebar-side sticky-container col-lg-3 col-md-12 col-sm-12">
								<aside className="sidebar theiaStickySidebar">
									<div className="sticky-sidebar">

										{/* <div className="sidebar-widget search-widget">
										<form method="post" action="contact.html">
											<div className="form-group">
												<input type="search" name="search-field" value="" placeholder="Search products…" required />
													<button type="submit"><span className="icon fa fa-search"></span></button>
											</div>
										</form>
									</div> */}


										<CartWidget />

										{/* <div className="sidebar-widget cart-widget">
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
										</div> */}


										{/* <div className="sidebar-widget tags-widget">
											<h3 className="widget-title">Tags</h3>
											<ul className="tag-list clearfix">
												<li><a href="#">Bars</a></li>
												<li><a href="#">Caramels</a></li>
												<li><a href="#">Chocolate</a></li>
												<li><a href="#">Fruit</a></li>
												<li><a href="#">Nuts</a></li>
												<li><a href="#">Toffees</a></li>
												<li><a href="#">Top Rated</a></li>
												<li><a href="#">Truffles</a></li>
											</ul>
										</div> */}
									</div>
								</aside>
							</div>
						</div>
					</div>
				</div>
			</Layout >
		</>
	);
};

export default ProductDetails;
