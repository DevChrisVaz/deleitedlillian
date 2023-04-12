import GetAllCategoriesUseCase from '@/architecture/application/usecases/category/GetAllCategoriesUseCase';
import GetManyProductsUseCase from '@/architecture/application/usecases/product/GetManyProductsUseCase';
import Category from '@/architecture/domain/entities/Category';
import Product from '@/architecture/domain/entities/Product';
import ProductFilters from '@/architecture/domain/entities/ProductFilters';
import CategoryRepo from '@/architecture/infrastructure/implementations/httpRequest/axios/CategoryRepo';
import ProductRepo from '@/architecture/infrastructure/implementations/httpRequest/axios/ProductRepo';
import { Layout } from '@/components/Layout';
import { PriceRangeSlider } from '@/components/PriceRangeSlider';
import { ProductPreview } from '@/components/ProductPreview';
import { CartWidget } from '@/components/widgets/CartWidget';
import { Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
export interface ShopProps { }

const Shop: React.FC<ShopProps> = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [totalProducts, setTotalProducts] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageButtons, setPageButtons] = useState<any>([]);
	const [currentFilter, setCurrentFilter] = useState<ProductFilters>({
		limit: 12,
		page: 1,
		category: "",
		searchBy: "",
		minPrice: 0,
		maxPrice: 0
	});
	const [minValue, setMinValue] = useState<number>(0);
	const [maxValue, setMaxValue] = useState<number>(0);

	const router = useRouter();
	const { page } = router.query;

	const productRepo = new ProductRepo();
	const categoryRepo = new CategoryRepo();
	const getManyProductsUseCase = new GetManyProductsUseCase(productRepo);
	const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepo);

	const getFilteredProducts = async (filter: ProductFilters) => {
		try {
			setLoading(true);
			const { data, status } = await getManyProductsUseCase.run(filter);
			if (status === 200 && data) {
				setCurrentFilter(filter);
				setProducts(data.products);
				setTotalProducts(data.total);
			}
			setLoading(false);
		} catch (err) {

		}
	}

	const getCategoryFilteredProducts = (category: string) => {
		const filter = {
			...currentFilter,
			category,
			page: 1
		}
		setCurrentFilter(filter);
		getFilteredProducts(filter);
		router.push({
			pathname: router.pathname,
			query: {
				page: 1
			}
		});
	}

	const getAllCategories = async () => {
		try {
			const { data, status } = await getAllCategoriesUseCase.run();
			if (status === 200 && data) {
				setCategories(data.filter(c => c.type === "CATEGORY"));
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handlePriceRangeChange = () => {
		const filter = {
			...currentFilter,
			page: 1
		}
		getFilteredProducts(filter);
		router.push({
			pathname: router.pathname,
			query: {
				page: 1
			}
		});
	}

	useEffect(() => {
		getFilteredProducts(currentFilter);
		getAllCategories();
	}, []);

	useEffect(() => {
		if (totalProducts > 0) {
			setPageButtons(Array.from({ length: Math.ceil(totalProducts / 12) }, (_, i) => i + 1));
		}
	}, [totalProducts]);

	useEffect(() => {
		if (page) {
			let temp: number;
			temp = (Array.isArray(page) ? parseInt(page[0]) : parseInt(page));
			setCurrentPage(temp);
		}
	}, [page]);

	useEffect(() => {
		const filter: ProductFilters = {
			...currentFilter,
			page: currentPage
		}
		getFilteredProducts(filter);
	}, [currentPage]);

	useEffect(() => {
		setCurrentFilter({
			...currentFilter,
			minPrice: minValue,
			maxPrice: maxValue
		})
	}, [minValue, maxValue]);
	
	return (
		<>
			<Head>
				<title>Tienda</title>
			</Head>
			<Layout>
				<section className="page-title" style={{ backgroundImage: "url(assets/images/backgrounds/doughnuts-1868573_1920.jpg)" }}>
					<div className="auto-container">
						<h1>Tienda</h1>
						<ul className="page-breadcrumb">
							<li><Link href="/">Inicio</Link></li>
							<li>Tienda</li>
						</ul>
					</div>
				</section>
				<div className="sidebar-page-container">
					<div className="auto-container">
						<div className="row clearfix">

							<div className="content-side col-lg-9 col-md-12 col-sm-12">
								<div className="our-shop">
									<div className="shop-upper-box clearfix">
										<div className="items-label">Mostrando {currentPage === 1 ? currentPage : 12 * (currentPage - 1) + 1} - {(12 * currentPage) > totalProducts ? totalProducts : (12 * currentPage)} de {totalProducts} resultados</div>
										<div className="orderby" style={{ visibility: "hidden" }}>
											<select name="orderby" className="sortby-select select2-offscreen">
												<option value="popularity">Sort by popularity</option>
												<option value="rating" >Sort by average rating</option>
												<option value="date" >Sort by newness</option>
												<option value="price" >Sort by price: low to high</option>
												<option value="price-desc" >Sort by price: high to low</option>
											</select>
										</div>
									</div>

									<div className="row clearfix">
										{
											products.length > 0 ?
												products.map((product, index) => (
													<ProductPreview key={index} product={product} />
												)) :
												<span>No se encontraron productos</span>
										}
									</div>
									<div className="row position-relative">
										{
											currentPage > 1 &&
											<div
												className={"pagination"}
												onClick={() => router.push({
													pathname: router.pathname,
													query: {
														page: currentPage - 1
													}
												})}
											>
												<svg viewBox="0 0 500 500">
													<path d="M488.5,274.5L488.5,274.5l1.8-0.5l-2,0.5c-2.4-8.7-4.5-16.9-4.5-24.5c0-8,2.3-16.5,4.7-25.5
													c3.5-13,7.1-26.5,3.7-39.5c-3.6-13.2-13.5-23.1-23.1-32.7c-6.5-6.5-12.6-12.6-16.6-19.4c-3.9-6.8-6.1-15.2-8.5-24.1
													c-3.5-13.1-7.1-26.7-16.7-36.3c-9.5-9.5-22.9-13.1-35.9-16.6c-9-2.4-17.5-4.6-24.4-8.7c-6.5-3.8-12.5-9.8-18.9-16.2
													c-9.7-9.8-19.6-19.8-33.2-23.4c-13.5-3.7-27.3,0.1-40.4,3.7c-8.7,2.4-16.9,4.6-24.5,4.6c-8,0-16.5-2.3-25.5-4.7
													c-9.3-2.5-18.8-5-28.1-5c-3.8,0-7.6,0.4-11.3,1.4C172,11.1,162,21.1,152.4,30.7c-6.5,6.5-12.6,12.6-19.4,16.6
													c-6.8,3.9-15.2,6.1-24.1,8.5c-13.1,3.5-26.7,7.1-36.3,16.7c-9.5,9.5-13.1,23-16.6,36c-2.4,9-4.6,17.5-8.7,24.4
													c-3.8,6.5-9.8,12.5-16.2,18.9c-9.8,9.7-19.7,19.6-23.4,33.2c-3.7,13.5,0.1,27.3,3.7,40.5c2.4,8.7,4.6,16.9,4.6,24.5
													c0,8-2.3,16.5-4.6,25.5c-3.5,13-7.1,26.6-3.7,39.5c3.6,13.2,13.5,23.1,23.1,32.7c6.5,6.5,12.6,12.6,16.6,19.4
													c3.9,6.8,6.1,15.1,8.5,24c3.5,13.1,7.1,26.8,16.7,36.4c9.5,9.5,23,13.1,35.9,16.6c9,2.4,17.5,4.6,24.4,8.7
													c6.5,3.8,12.5,9.8,18.9,16.2c9.7,9.8,19.6,19.8,33.2,23.5c3.8,1,7.6,1.5,11.8,1.5c9.6,0,19.3-2.7,28.5-5.1c8.8-2.4,17-4.6,24.5-4.6 c8,0,16.5,2.3,25.5,4.6c13,3.6,26.6,7.1,39.5,3.7c13.2-3.6,23.1-13.5,32.7-23.1c6.5-6.5,12.6-12.6,19.4-16.6 c6.7-3.9,15.1-6.1,24-8.5c13.1-3.5,26.8-7.1,36.4-16.8c9.5-9.5,13.1-23,16.6-36c2.4-9,4.6-17.5,8.7-24.4c3.8-6.5,9.8-12.5,16.2-18.9 c9.8-9.7,19.9-19.7,23.6-33.3C495.7,301.4,494.4,287.7,488.5,274.5z">
													</path>
												</svg>
												<i className="bi bi-chevron-left"></i>
											</div>
										}
										{pageButtons.map((num: number, index: number) => (
											<div
												key={index}
												onClick={() => {
													router.push({
														pathname: router.pathname,
														query: {
															page: num
														}
													})
												}}
												className={`pagination ${num === currentPage ? "selected" : ""}`}
											>
												<svg viewBox="0 0 500 500">
													<path d="M488.5,274.5L488.5,274.5l1.8-0.5l-2,0.5c-2.4-8.7-4.5-16.9-4.5-24.5c0-8,2.3-16.5,4.7-25.5
													c3.5-13,7.1-26.5,3.7-39.5c-3.6-13.2-13.5-23.1-23.1-32.7c-6.5-6.5-12.6-12.6-16.6-19.4c-3.9-6.8-6.1-15.2-8.5-24.1
													c-3.5-13.1-7.1-26.7-16.7-36.3c-9.5-9.5-22.9-13.1-35.9-16.6c-9-2.4-17.5-4.6-24.4-8.7c-6.5-3.8-12.5-9.8-18.9-16.2
													c-9.7-9.8-19.6-19.8-33.2-23.4c-13.5-3.7-27.3,0.1-40.4,3.7c-8.7,2.4-16.9,4.6-24.5,4.6c-8,0-16.5-2.3-25.5-4.7
													c-9.3-2.5-18.8-5-28.1-5c-3.8,0-7.6,0.4-11.3,1.4C172,11.1,162,21.1,152.4,30.7c-6.5,6.5-12.6,12.6-19.4,16.6
													c-6.8,3.9-15.2,6.1-24.1,8.5c-13.1,3.5-26.7,7.1-36.3,16.7c-9.5,9.5-13.1,23-16.6,36c-2.4,9-4.6,17.5-8.7,24.4
													c-3.8,6.5-9.8,12.5-16.2,18.9c-9.8,9.7-19.7,19.6-23.4,33.2c-3.7,13.5,0.1,27.3,3.7,40.5c2.4,8.7,4.6,16.9,4.6,24.5
													c0,8-2.3,16.5-4.6,25.5c-3.5,13-7.1,26.6-3.7,39.5c3.6,13.2,13.5,23.1,23.1,32.7c6.5,6.5,12.6,12.6,16.6,19.4
													c3.9,6.8,6.1,15.1,8.5,24c3.5,13.1,7.1,26.8,16.7,36.4c9.5,9.5,23,13.1,35.9,16.6c9,2.4,17.5,4.6,24.4,8.7
													c6.5,3.8,12.5,9.8,18.9,16.2c9.7,9.8,19.6,19.8,33.2,23.5c3.8,1,7.6,1.5,11.8,1.5c9.6,0,19.3-2.7,28.5-5.1c8.8-2.4,17-4.6,24.5-4.6 c8,0,16.5,2.3,25.5,4.6c13,3.6,26.6,7.1,39.5,3.7c13.2-3.6,23.1-13.5,32.7-23.1c6.5-6.5,12.6-12.6,19.4-16.6 c6.7-3.9,15.1-6.1,24-8.5c13.1-3.5,26.8-7.1,36.4-16.8c9.5-9.5,13.1-23,16.6-36c2.4-9,4.6-17.5,8.7-24.4c3.8-6.5,9.8-12.5,16.2-18.9 c9.8-9.7,19.9-19.7,23.6-33.3C495.7,301.4,494.4,287.7,488.5,274.5z">
													</path>
												</svg>
												{num}
											</div>
										))}
										{
											pageButtons.length !== currentPage &&
											<div
												className={"pagination"}
												onClick={() => router.push({
													pathname: router.pathname,
													query: {
														page: currentPage + 1
													}
												})}
											>
												<svg viewBox="0 0 500 500">
													<path d="M488.5,274.5L488.5,274.5l1.8-0.5l-2,0.5c-2.4-8.7-4.5-16.9-4.5-24.5c0-8,2.3-16.5,4.7-25.5
													c3.5-13,7.1-26.5,3.7-39.5c-3.6-13.2-13.5-23.1-23.1-32.7c-6.5-6.5-12.6-12.6-16.6-19.4c-3.9-6.8-6.1-15.2-8.5-24.1
													c-3.5-13.1-7.1-26.7-16.7-36.3c-9.5-9.5-22.9-13.1-35.9-16.6c-9-2.4-17.5-4.6-24.4-8.7c-6.5-3.8-12.5-9.8-18.9-16.2
													c-9.7-9.8-19.6-19.8-33.2-23.4c-13.5-3.7-27.3,0.1-40.4,3.7c-8.7,2.4-16.9,4.6-24.5,4.6c-8,0-16.5-2.3-25.5-4.7
													c-9.3-2.5-18.8-5-28.1-5c-3.8,0-7.6,0.4-11.3,1.4C172,11.1,162,21.1,152.4,30.7c-6.5,6.5-12.6,12.6-19.4,16.6
													c-6.8,3.9-15.2,6.1-24.1,8.5c-13.1,3.5-26.7,7.1-36.3,16.7c-9.5,9.5-13.1,23-16.6,36c-2.4,9-4.6,17.5-8.7,24.4
													c-3.8,6.5-9.8,12.5-16.2,18.9c-9.8,9.7-19.7,19.6-23.4,33.2c-3.7,13.5,0.1,27.3,3.7,40.5c2.4,8.7,4.6,16.9,4.6,24.5
													c0,8-2.3,16.5-4.6,25.5c-3.5,13-7.1,26.6-3.7,39.5c3.6,13.2,13.5,23.1,23.1,32.7c6.5,6.5,12.6,12.6,16.6,19.4
													c3.9,6.8,6.1,15.1,8.5,24c3.5,13.1,7.1,26.8,16.7,36.4c9.5,9.5,23,13.1,35.9,16.6c9,2.4,17.5,4.6,24.4,8.7
													c6.5,3.8,12.5,9.8,18.9,16.2c9.7,9.8,19.6,19.8,33.2,23.5c3.8,1,7.6,1.5,11.8,1.5c9.6,0,19.3-2.7,28.5-5.1c8.8-2.4,17-4.6,24.5-4.6 c8,0,16.5,2.3,25.5,4.6c13,3.6,26.6,7.1,39.5,3.7c13.2-3.6,23.1-13.5,32.7-23.1c6.5-6.5,12.6-12.6,19.4-16.6 c6.7-3.9,15.1-6.1,24-8.5c13.1-3.5,26.8-7.1,36.4-16.8c9.5-9.5,13.1-23,16.6-36c2.4-9,4.6-17.5,8.7-24.4c3.8-6.5,9.8-12.5,16.2-18.9 c9.8-9.7,19.9-19.7,23.6-33.3C495.7,301.4,494.4,287.7,488.5,274.5z">
													</path>
												</svg>
												<i className="bi bi-chevron-right"></i>
											</div>
										}
									</div>
								</div>
							</div>

							<div className="sidebar-side sticky-container col-lg-3 col-md-12 col-sm-12">
								<aside className="sidebar theiaStickySidebar">
									<div className="sticky-sidebar">

										<div className="sidebar-widget search-widget">
											<Formik
												initialValues={currentFilter}
												onSubmit={getFilteredProducts}
												enableReinitialize={true}
											>
												{({
													values,
													handleChange,
													handleSubmit
												}) => (
													<form onSubmit={handleSubmit}>
														<div className="form-group">
															<input 
																type="search" 
																name="searchBy" 
																value={values.searchBy}
																onChange={handleChange}
																placeholder="Buscar productos" 
															/>
															<button type="submit"><span className="icon fa fa-search"></span></button>
														</div>
													</form>
												)}
											</Formik>
										</div>

										<CartWidget />

										<div className="sidebar-widget rangeslider-widget">
											<div className="widget-content">
												<h3 className="widget-title">Filtro de precios</h3>

												<div className="range-slider-one clearfix">
													<PriceRangeSlider min={0} max={2000} priceGap={0} setMinValue={setMinValue} setMaxValue={setMaxValue} />
													<div className="clearfix">
														<div className="pull-left input-box" style={{ visibility: "hidden" }}>
															<div className="title">Precio:</div>
															<div className="input"><input type="text" className="property-amount" name="field-name" readOnly /></div>
														</div>
														<div className="pull-right btn-box">
															<a className="theme-btn" onClick={handlePriceRangeChange}><span className="btn-title">Filtro</span></a>
														</div>
													</div>
												</div>
											</div>
										</div>
										{
											categories.length > 0 &&
											<div className="sidebar-widget tags-widget">
												<h3 className="widget-title">Categorías</h3>
												<ul className="tag-list clearfix">
													<li><a onClick={() => getCategoryFilteredProducts("")}>Todos</a></li>
													{
														categories.map((category, index) => (
															<li key={index}><a onClick={() => getCategoryFilteredProducts(category.uuid ?? "")}>{category.name}</a></li>
														))
													}
												</ul>
											</div>
										}
									</div>
								</aside>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Shop;
