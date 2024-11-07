import { NorthWindClient } from "@/components/client/NorthWindClient";
import React, { useState, useEffect } from "react";
import OrderGrid from "@/components/orders/orderGrid";
import OrderItem from "@/components/orders/orderItem";
import AlertMsg from "@/components/messaging/AlertMsg.jsx";
import CloseIcon from "@/assets/icon/closeIcon.svg";

const Orders = () => {
    const [orders, setOrders] = useState(null);
    const [viewingOrder, setViewingOrder] = useState(null);
    const [msg, setMsg] = useState(null);

    const msgView = () => {
        return {display: msg === null ? "none" : ""};
    }

    const gridView = () => {
        return {display: viewingOrder === null && msg === null ? "" : "none"};
    }
    
    const detailView = () => {
        return {display: viewingOrder === null ? "none" : ""};
    }

    useEffect(() => {
        NorthWindClient.get("order/all")
        .then(data => {
            setOrders(data);
            setMsg(null);
        })
        .catch(error => {
            console.error("Server Error", error);
            setMsg(AlertMsg("danger", "Server Error", error.message));
        });
    }, [])

    function viewOrder(toView){
        setViewingOrder(OrderItem(toView));
    }

    function closeOrderView(){
        setViewingOrder(null);
    }

    return (
        <>
            <div className="p-5 w-50" style={msgView()}>
                {msg}
            </div>

            <div style={gridView()}>
                <h1 className="display-1 p-3">Orders</h1>
                <hr />
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