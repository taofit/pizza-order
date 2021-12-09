import React from 'react';
import { useLocation } from 'react-router-dom';

const Order = () => {
    const location = useLocation();
    const orderData = location.state;
    const orderList = Object.keys(orderData).map((value) => `${value}: ${orderData[value]}`);

    return (
        <div>
            <h3>Your order details</h3>
            <ul>{orderList.map((item, index) => <li key={index}>{item}</li>)}</ul>
        </div>
    );
}

export default Order;