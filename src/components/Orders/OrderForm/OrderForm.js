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

    const { currentUser } = useAuth(); // Use authentication context to get the current user.

    // Initialize form state with either existing order data or defaults.
    const [formData, setFormData] = useState({
        customer_id: order ? order.customer_id : currentUser?.uid, // Use order customer ID or current user ID.
        status: order ? order.status : 'pending', // Default status is 'pending'.
        items: order ? order.items : [] // Start with items in the order or an empty array.
    });


    // Handle input changes for the form and individual items.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Add a new item to the order.
    const addOrderItem = () => {
        const newItems = [...formData.items, { product_id: '', quantity: 1 }];
        setFormData({ ...formData, items: newItems });
    };

    // Update details of a specific item in the order.
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

    // Render form fields for each item in the order.
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
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                        min="1"
                        disabled={isView}
                    />
                </label>
                
                <hr />
            </div>
        ));
    };
    
    // Submit the form data.
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    // Check if the save button should be disabled.
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
                <h2>{isView ? 'View Order' : 'Create Order'}</h2>
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

            { isView && (
                <div className='order-product-total-price'>
                    <h2>
                        Total Price: {order?.total_price} $
                    </h2>
                </div>
            )}

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
