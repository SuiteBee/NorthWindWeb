import { NorthWindClient } from "@/components/client/NorthWindClient";
import React, { useState, useEffect } from "react";
import OrderGrid from "@/components/orders/orderGrid";

const Orders = () => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        NorthWindClient.get("order/all")
        .then(data => setOrders(data))
        .catch(error => console.error("Fetching orders failed", error));
    }, [])

    return (
        <>
            <h1>Orders</h1>
            <div>
                Here we will display order info
            </div>
            <div>
                <OrderGrid allOrders={orders}/>
            </div>
        </>
    );
};

export default Orders;