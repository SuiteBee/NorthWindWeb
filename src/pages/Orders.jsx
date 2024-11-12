import { NorthWindClient } from "@/components/client/NorthWindClient";
import React, { useState, useEffect } from "react";
import OrderGrid from "@/components/orders/orderGrid";
import OrderItem from "@/components/orders/orderItem";
import CloseIcon from "@/assets/icon/closeIcon.svg";
import useAlert from "@/hooks/useAlert";

const Orders = () => {
    const [orders, setOrders] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);
    const { setAlert, clearAlert } = useAlert();

    function viewOrder(toView){
        setOrderDetail(OrderItem(toView));
    }

    function closeOrderView(){
        setOrderDetail(null);
    }

    //Popualate Order grid with all orders
    useEffect(() => {
        NorthWindClient.get("order/all")
        .then(data => {
            setOrders(data);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Order Grid", error.message);
        });
    }, [])

    if(orderDetail === null){
     return (
        <div className="h-100">
            <h1 className="display-1 p-2 text-white">Orders</h1>
            <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
            <div className="d-flex px-4 gap-3 justify-content-start">
                <div className="col-sm-auto">
                    <button 
                        type="button" 
                        className="btn btn-primary btn-long" 
                        onClick={{}}>
                        Create
                    </button>
                </div>
                <div className="col-sm-auto">
                    <button 
                        type="button" 
                        className="btn btn-primary btn-long" 
                        onClick={{}}>
                        Update
                    </button>
                </div>
            </div>
            
            <div>
                <OrderGrid allOrders={orders} viewOrder={viewOrder}/>
            </div>
        </div>
     )       
    } else{
        return(
            <div className="h-100 text-white">
                <div className="d-flex">
                    <h1 className="display-1 p-2">Order Details</h1>
                    <div className="align-self-start ms-auto">
                        <button 
                            type="button" 
                            className="btn btn__danger btn__close"
                            onClick={closeOrderView}>
                            <img src={CloseIcon}/>
                        </button>
                    </div>
                    
                </div>

                {orderDetail}
            </div>
        )
    }
};

export default Orders;