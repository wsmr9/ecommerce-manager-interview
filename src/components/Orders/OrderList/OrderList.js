import React , { useState,  useEffect } from "react";
import ModalCustom from "../../Layout/Modal/Modal";

import OrderItem from "../OrderItem/OrderItem";
import OrderForm from "../OrderForm/OrderForm";
import Loading from "../../Layout/Loading/Loading";
import ErrorBanner from '../../Layout/ErrorBanner/ErrorBanner';

import useHttp from "../../../hook/useHttp";

import config from "../../../config/config";

import './OrderList.css'

const OrderList = () => {

    const {isLoading,  error, sendRequest } = useHttp()

    const [ products, setProducts ] = useState([])
    const [orders , setOrders ] = useState([])

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isView, setIsView] = useState(false)

    // Fetch product data from the configured endpoint.
    const fetchProductData = async () => {
        try {
            const data = await sendRequest(`${config.productsEndpoint}/products`);
            setProducts(data)
        } catch (error) { console.log(error)}
    }

    // Fetch order data from the configured endpoint.
    const fetchOrderData = async () => {
        try {
            const data = await sendRequest(`${config.ordersEndpoint}/orders`);
            setOrders(data["orders"])
        } catch (error) { console.log(error)}
    }

    // Function to handle the creation of a new order.
    const createOrderRequest = async ( orderData ) => {
        try {
            const data = await sendRequest(`${config.ordersEndpoint}/orders` , 'POST', orderData, {
                'Content-Type': 'application/json'
            });
            console.log(data)
        } catch (error) { console.log(error)}
    }

    // Fetch product data on component mount.
    useEffect(() => {
        fetchProductData()
    },[])

    // Fetch order data once products are loaded.
    useEffect(() => {
        if (!products) return 
        fetchOrderData()
    },[products])

     // Functions to handle modal open and close.
    const openModal = (order = null, isView = false ) => {
        setIsView(isView)
        setSelectedOrder(order);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedOrder(null);
    };

    // Handle saving of an order and then re-fetch product data.
    const handleSaveOrder = (orderData) => {
        console.log(orderData);
        createOrderRequest(orderData).then(() => closeModal()).then(() => fetchProductData())
    };

    // Render order data into OrderItem components.
    const renderedOrderData = orders.map((order) => (
        <OrderItem 
            key={order.id}
            order={order}
            onView={() => openModal(order , true )}
        />
    ));

    return ( 
        <div className="order-list-container">
            { isLoading && <Loading /> }
            <button className="create-btn" onClick={() => openModal()}>Create New Order</button>
            {error && <ErrorBanner error={error} />}
            <table className="order-list-table">
                <thead>
                    <tr>
                        <th>ORDER ID</th>
                        <th>CUSTOMER ID</th>
                        <th>STATUS</th>
                        <th>TOTAL PRICE</th>
                        <th>CREATED AT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {renderedOrderData}
                </tbody>

                
            </table>
            
            { Object.values(orders).length === 0 &&<div className="no-orders">No Orders Have Been Registered </div>}
            
            <ModalCustom
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <OrderForm 
                    order={selectedOrder} 
                    onSave={handleSaveOrder} 
                    products={products}
                    isView={isView}
                    closeModel={closeModal}
                />
            </ModalCustom>
        </div>
    )
}

export default OrderList