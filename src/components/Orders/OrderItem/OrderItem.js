import React from "react";
import './OrderItem.css'  // Import CSS for styling the order item.

const OrderItem = ({ order, onView }) => {
    return (
        // Table row for each order item.
        <tr className="order-item">
            <td>{order.id}</td>
            <td>{order.customer_id}</td>
            <td>{order.status}</td>
            <td>${order.total_price}</td>
            <td>{new Date(order.created_at).toLocaleDateString()}</td>
            <td>
                <button className="order-item-button" onClick={() => onView(order)}>View</button>
            </td>
        </tr>
    );
}

export default OrderItem;  // Export the OrderItem component for use in other parts of the application.
