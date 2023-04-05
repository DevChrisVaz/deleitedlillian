import Product from '@/architecture/domain/entities/Product';
import { addItem, removeItem, selectCartState } from '@/features/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import numeral from 'numeral';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";

export interface ProductPreviewProps {
	product: Product;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ product }) => {

	const dispatch = useDispatch();
	const cart = useSelector(selectCartState);

	const handleAddItem = (product: Product) => {
        dispatch(addItem(product));
    }

	const handleRemoveFromCart = (uuid: string) => {
		dispatch(removeItem(uuid));
	}

	const isInCart = (id: string): boolean => {
		if (cart.find(i => i.product.uuid === id)?.qty) return true;
		return false;
	}

	return (
		<div className="shop-item col-lg-4 col-md-6 col-sm-12">
			<div className="inner-box">
				<div className="image-box">
					{/* Nota si está en descuento */}
					{/* <div className="sale-tag">sale!</div> */}
					<figure className="image"><Link href={"/product-details?id=" + product.uuid}><Image src={process.env.NEXT_PUBLIC_API_URL_PUBLIC + product.images[0]} width={300} height={300} alt="" /></Link></figure>
					{
						isInCart(product.uuid ?? "") ? 
						<div className="btn-box" onClick={() => handleRemoveFromCart(product.uuid ?? "")}>
							<a style={{ cursor: "pointer" }}>Eliminar del carrito</a>
						</div>
						:
						<div className="btn-box" onClick={() => handleAddItem(product)}>
							<a style={{ cursor: "pointer" }}>Agregar al carrito</a>
						</div>
					}
				</div>
				<div className="lower-content">
					<h4 className="name"><Link href={"/product-details?id=" + product.uuid}>{product.name}</Link></h4>
					{/* Rating cuando se haya implementado */}
					{/* <div className="rating"><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star light"></span></div> */}
					<div className="price">{numeral(product.price).format("$0,0.00")}</div>
					{/* Precio con descuento */}
					{/* <div className="price"><del>$29.00</del> $25.00</div> */}
				</div>
			</div>
		</div>
	);
};

export default ProductPreview;
