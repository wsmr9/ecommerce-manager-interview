import React from "react";
import './ProductItem.css'

const ProductItem = ({ product }) => {

    return (
        <tr className="product-item">
            <tr>
                <img src={product.image} />
            </tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>${product.price}</td>
            <td>{new Date(product.createdAt).toLocaleDateString()}</td>
        </tr>
    );
}

export default ProductItem

