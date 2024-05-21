import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext/AuthContext'; 

import './OrderForm.css'

const OrderForm = ({ 
        order, 
        onSave, 
        products, 
        isView,
        closeModel
    }) => {

    const { currentUser } = useAuth();

    // Estado inicial del formulario
    const [formData, setFormData] = useState({
        customer_id: order ? order.customer_id : currentUser?.uid ,
        status: order ? order.status : 'pending',
        items: order ? order.items : []
    });

    // Maneja los cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Añade un nuevo item de orden
    const addOrderItem = () => {
        const newItems = [...formData.items, { product_id: '', quantity: 1 }];
        setFormData({ ...formData, items: newItems });
    };

    // Actualiza los items de la orden
    const handleItemChange = (index, field, value) => {
        const newItems = formData.items.map((item, i) => {
            if (index === i) {
                if ( field == 'product_id'){
                    const product = Object.values(products).find( product => product.id === value )
                    
                    if ( product){
                        
                        item['price_per_unit'] = product.price
                    }
                }
                return { 
                    ...item,

                    [field]: value 
                };
            }
            return item;
        });
        setFormData({ ...formData, items: newItems });
    };

    const renderOrderItems = () => {
        return formData.items.map((item, index) => (
            <div key={index} className="item-row">
                { !isNaN(item.product_id) && (
                    <img src={products.find(p => p.id === item.product_id)?.image} alt="Product" className="product-image"/>
                )}
                <label>
                    Product Name:
                    <select
                        value={item.product_id}
                        onChange={(e) => handleItemChange(index, 'product_id', parseInt(e.target.value))}
                        disabled={isView}
                    >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name} - ${product.price}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Product Quantity:
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        min="1"
                        disabled={isView}
                    />
                </label>
                
                <hr />
            </div>
        ));
    };
    

 
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const isDisabledToSave = () => {
        if (formData.items.length === 0) return true;
        const hasInvalidProductId = formData.items.some(item => 
            item.product_id === '' || isNaN(Number(item.product_id))
        );
        const hasInvalidQuantity = formData.items.some(item => 
            item.quantity <= 0 || isNaN(Number(item.quantity))
        );
        return hasInvalidProductId || hasInvalidQuantity;
    }

    return (
        <form className='order-form' onSubmit={handleSubmit}>
            <div className="order-form-header">
                <h2>Create Order</h2>
                <button type='button' onClick={closeModel} className="close-button">X</button>
            </div>
            
            <label>
                Customer ID:
                <input
                    type="text"
                    name="customer_id"
                    value={formData.customer_id}
                    onChange={handleInputChange}
                    disabled={true}
                />
            </label>
            <label>
                Status:
                <input
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={true}
                />
            </label>
            
            {formData.items.length !== 0 && <div className='order-products-fields'>{renderOrderItems()}</div>}

            {!isView && (
                <div>
                <div className='form-buttons'>
                    <button type="button" onClick={addOrderItem} className="add-item-button">Add Item</button>
                    <button type="submit" disabled={isDisabledToSave()} className="save-order-button">Save Order</button>
                </div>
                {isDisabledToSave() && <p>Please, it is required to add an item to create an order.</p>}
                </div>
            )}
            
        </form>
    );
};

export default OrderForm;
