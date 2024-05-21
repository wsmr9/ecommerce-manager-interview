import React, { useEffect , useState} from "react";

import ProductItem from "../ProductItem/ProductItem";
import Loading from "../../Layout/Loading/Loading";

import useHttp from "../../../hook/useHttp";

import config from "../../../config/config";

import './ProductList.css'

const ProductList = () => {

    const  { isLoading , error , sendRequest } = useHttp();

    const [ loadedData , setLoadedData ] = useState([]);

    const fetchData = async () => {
        const data = await sendRequest(`${config.productsEndpoint}/products`);
        setLoadedData(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderedProduct = loadedData.length > 0 && Object.values(loadedData).map(( product ) => {
        return (
            <ProductItem 
                key={product.id}
                product={product}
            />
        )
    } )

    return ( 
        <div className="product-list-container">
            {isLoading && <Loading />}
            <table className="product-list-table">
                <thead>
                    <tr> 
                        <th>Image</th>
                        <th>Product Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    { renderedProduct}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList