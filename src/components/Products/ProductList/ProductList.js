import React, { useEffect, useState } from "react";

import ProductItem from "../ProductItem/ProductItem";  // Component for rendering each product.
import Loading from "../../Layout/Loading/Loading";  // Loading indicator component.

import useHttp from "../../../hook/useHttp";  // Custom hook for HTTP requests.

import config from "../../../config/config";  // Configuration for endpoints.

import ErrorBanner from '../../Layout/ErrorBanner/ErrorBanner';

import './ProductList.css';  // CSS for styling the product list.

const ProductList = () => {

    const { isLoading, error, sendRequest } = useHttp();  // Destructuring from useHttp hook.

    const [products, setProducts] = useState([]);  // State to store loaded product data.

    const fetchData = async () => {
        try {
            const data = await sendRequest(`${config.productsEndpoint}/products`);  // Fetch data using the custom hook.
            setProducts(data);  // Update state with fetched data.
        } catch (error) {console.log(error)}
    };

    useEffect(() => {
        fetchData();  // Fetch product data on component mount.
    }, []);  // Empty dependency array means this effect runs only once after the initial render.

    // Mapping over loaded data to create ProductItem components.
    const renderedProduct = products.length > 0 && Object.values(products).map((product) => {
        return (
            <ProductItem 
                key={product.id}  // Unique key for each child in a list.
                product={product}  // Passing product data to the ProductItem component.
            />
        )
    })

    return (
        <div className="product-list-container">
            {error && <ErrorBanner error={error} />}
            {isLoading && <Loading />}
            <table className="product-list-table">
                <thead>
                    <tr> 
                        <th>IMAGE</th>
                        <th>PRODUC ID</th>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>PRICE</th>
                        <th>CREATED AT</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedProduct}
                </tbody>
            </table>
            
            { Object.values(products).length === 0 &&<div className="no-products">No Products Have Been Registered </div>}
            
        </div>
    )
}

export default ProductList;  // Export ProductList for use in other parts of the application.
