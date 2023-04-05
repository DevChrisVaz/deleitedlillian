import GetAllCategoriesUseCase from '@/architecture/application/usecases/category/GetAllCategoriesUseCase';
import GetManyProductsUseCase from '@/architecture/application/usecases/product/GetManyProductsUseCase';
import Category from '@/architecture/domain/entities/Category';
import Product from '@/architecture/domain/entities/Product';
import ProductFilters from '@/architecture/domain/entities/ProductFilters';
import CategoryRepo from '@/architecture/infrastructure/implementations/httpRequest/axios/CategoryRepo';
import ProductRepo from '@/architecture/infrastructure/implementations/httpRequest/axios/ProductRepo';
import { Layout } from '@/components/Layout';
import { ProductPreview } from '@/components/ProductPreview';
import { CartWidget } from '@/components/widgets/CartWidget';
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
    const [currentFilter, setCurrentFilter] = useState<ProductFilters>({});
    const [initialValues, setInitialValues] = useState<ProductFilters>({
        category: "",
        searchBy: ""
    });

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

    const getAllCategories = async () => {
        try {
            const { data, status } = await getAllCategoriesUseCase.run();
            if (status === 200 && data) {
                setCategories(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFilteredProducts(currentFilter);
        getAllCategories();
    }, []);

    useEffect(() => {
        if (totalProducts > 0) {
            setPageButtons(Array.from({ length: Math.ceil(totalProducts / 12) }, (_, i) => i + 1));
            // setPageButtons()
        }
    }, [totalProducts]);

    useEffect(() => {
        let temp: number;
        temp = page ? (Array.isArray(page) ? parseInt(page[0]) : parseInt(page)) : 0;
        setCurrentPage(temp);
    }, [page]);

    useEffect(() => {
        const filter: ProductFilters = {
            ...currentFilter,
            page: currentPage
        }
        getFilteredProducts(filter);
    }, [currentPage]);

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
										<div className="orderby">
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
								</div>
							</div>

							<div className="sidebar-side sticky-container col-lg-3 col-md-12 col-sm-12">
								<aside className="sidebar theiaStickySidebar">
									<div className="sticky-sidebar">

										<div className="sidebar-widget search-widget">
											<form method="post" action="contact.html">
												<div className="form-group">
													<input type="search" name="search-field" value="" placeholder="Search products…" required />
													<button type="submit"><span className="icon fa fa-search"></span></button>
												</div>
											</form>
										</div>

										<CartWidget />

										<div className="sidebar-widget rangeslider-widget">
											<div className="widget-content">
												<h3 className="widget-title">Filtro de precios</h3>

												<div className="range-slider-one clearfix">
													<div className="price-range-slider"></div>
													<div className="clearfix">
														<div className="pull-left input-box">
															<div className="title">Precio:</div>
															<div className="input"><input type="text" className="property-amount" name="field-name" readOnly /></div>
														</div>
														<div className="pull-right btn-box">
															<a href="#" className="theme-btn"><span className="btn-title">Filtro</span></a>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="sidebar-widget tags-widget">
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
										</div>
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
