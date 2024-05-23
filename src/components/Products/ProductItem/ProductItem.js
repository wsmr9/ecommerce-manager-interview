import React from "react";
import './ProductItem.css'; // Import CSS for styling.

const ProductItem = ({ product }) => {
    return (
        // Corrected the structure by using <td> for the image cell.
        <tr className="product-item">
            <td>
                <img src={product.image} alt={product.name} />
            </td>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>${product.price}</td>
            <td>{new Date(product.createdAt).toLocaleDateString()}</td>
        </tr>
    );
}

export default ProductItem; // Export the component for use in other parts of the application.
