import React , { useState,  useEffect } from "react";
import Modal from 'react-modal';

import OrderItem from "../OrderItem/OrderItem";
import OrderForm from "../OrderForm/OrderForm";
import Loading from "../../Layout/Loading/Loading";

import useHttp from "../../../hook/useHttp";

import config from "../../../config/config";

import './OrderList.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        maxHeight: '90vh',
        overflow: 'auto',
        border: 'none'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
};


const OrderList = () => {

    const {isLoading,  error, sendRequest } = useHttp()

    const [ products, setProducts ] = useState([])
    const [orders , setOrders ] = useState([])

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isView, setIsView] = useState(false)

    const fetchProductData = async () => {
        const data = await sendRequest(`${config.productsEndpoint}/products`);
        setProducts(data)
    }

    const processOrderData = ( data ) => {

        // const orderJoinProductData = Object.values(data).map( order => {

        //     order['products'] = Objet.values(order.items).map( orderItem => {
                
        //         product_info = products.find( product => product.id == orderItem.product_id )

        //         return {
        //             ...orderItem,
        //             'product_indo' : product_info
        //         }
        //     })

        //     return {
        //         ...order,
        //     }

        // })

        // setOrders(orderJoinProductData)

        setOrders(data)

    }

    const fetchOrderData = async () => {
        const data = await sendRequest(`${config.ordersEndpoint}/orders`);
        //processOrderData(data["orders"])
        setOrders(data["orders"])
    }

    const createOrderRequest = async ( orderData ) => {
        const data = await sendRequest(`${config.ordersEndpoint}/orders` , 'POST', orderData, {
            'Content-Type': 'application/json'
        });
    }

    useEffect(() => {
        fetchProductData()
    },[])

    useEffect(() => {
        if (!products) return 
        fetchOrderData()
    },[products])

    const openModal = (order = null, isView = false ) => {
        setIsView(isView)
        setSelectedOrder(order);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedOrder(null);
    };

    const handleSaveOrder = (orderData) => {
        console.log(orderData);
        createOrderRequest(orderData).then(() => closeModal()).then(() => fetchProductData())
    };

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
            <table className="order-list-table">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Customer Id</th>
                        <th>Status</th>
                        <th>Total Price</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {renderedOrderData}
                </tbody>

                <div>
                { Object.values(orders).length === 0 &&<div className="no-orders">No Orders Listed</div>}
                </div>
            </table>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <OrderForm 
                    order={selectedOrder} 
                    onSave={handleSaveOrder} 
                    products={products}
                    isView={isView}
                    closeModel={closeModal}
                />
            </Modal>
        </div>
    )
}

export default OrderList