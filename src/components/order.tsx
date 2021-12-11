import React, {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {ReadOrder} from '../services/API';

const Order = () => {
    const location = useLocation();
    const newOrderData = location.state;
    const [orderId, setOrderId] = useState<number>();
    const [newOrderInList, setNewOrderInList] = useState<{ [x: string]: string }[]>();
    const [orderInList, setOrderInList] = useState<{ [x: string]: any}[]>();
    const ulClassName = "order-in-list";

    const renderNewOrderToList = () => {
        return !!newOrderInList?.length && (<ul className={ulClassName}>
            {newOrderInList.map((item, index) => {
                const key = Object.keys(item)[0];
                return <li key={index}><span>{key}</span>: {item[key]}</li>
            })}
        </ul>);
    };

    const renderOrderToList = () => {
        return !!orderInList?.length && (<ul className={ulClassName}>
            {
                orderInList.map((orderItem, index) => {
                    const key = Object.keys(orderItem)[0];
                    if (Array.isArray(orderItem[key])) {
                        return (<li key={index}> <span>{key}</span>:
                            <ul>
                                {orderItem[key].map((item: {menuItemId: number, quantity: number}) => <li key={item.menuItemId}>
                                    <span>menuItemId</span>: {item.menuItemId}, <span>quantity</span>: {item.quantity}
                                </li>)}
                            </ul>
                        </li>);
                    } else {
                        return (<li key={index}><span>{key}</span>: {orderItem[key]}</li>);
                    }
                })
            }
        </ul>);
    };

    const viewOrder = () => {
        if (!!orderId) {
            ReadOrder(orderId).then((data) => {
                const orderArr = Object.keys(data).map((key) => ({[key]: data[key]}));
                setOrderInList(orderArr);
                setNewOrderInList([]);
            })

        }
    };

    useEffect(() => {
        const newOrderList = Object.keys(newOrderData).map((key) => ({[key]: newOrderData[key]}));
        setNewOrderInList(newOrderList);
        setOrderId(newOrderData.orderId);
    }, [newOrderData]);

    return (
        <div className="order-detail">
            <Link to={{ pathname: '/' }}>Home</Link>
            <h3>Your order details</h3>
            <Button variant="primary" onClick={viewOrder}>Check current order</Button>
            {renderNewOrderToList()}
            {renderOrderToList()}
        </div>
    );
}

export default Order;