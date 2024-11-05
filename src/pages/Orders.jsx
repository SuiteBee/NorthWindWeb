import { NorthWindClient } from "@/components/client/NorthWindClient";
import React, { useState, useEffect } from "react";
import OrderGrid from "@/components/orders/orderGrid";
import OrderItem from "@/components/orders/orderItem";

import CloseIcon from "@/assets/icon/closeIcon.svg";

const Orders = () => {
    const [orders, setOrders] = useState(null);
    const [viewingOrder, setViewingOrder] = useState(null);
    
    const gridView = () => {
        return {display: viewingOrder === null ? "" : "none"};
    }
    
    const detailView = () => {
        return {display: viewingOrder === null ? "none" : ""};
    }

    useEffect(() => {
        NorthWindClient.get("order/all")
        .then(data => setOrders(data))
        .catch(error => console.error("Fetching orders failed", error));
    }, [])

    function viewOrder(toView){
        setViewingOrder(OrderItem(toView));
    }

    function closeOrderView(){
        setViewingOrder(null);
    }

    return (
        <>
            <div style={gridView()}>
                <h1>Orders</h1>
                <div>
                    <OrderGrid allOrders={orders} viewOrder={viewOrder}/>
                </div>
            </div>
            
            <div style={detailView()}>
                <button 
                    type="button" 
                    className="btn btn__danger btn__close"
                    onClick={closeOrderView}>
                    <img src={CloseIcon}/>
                </button>
                <h1>Details</h1>
                {viewingOrder}
            </div>
        </>
    );
};

export default Orders;