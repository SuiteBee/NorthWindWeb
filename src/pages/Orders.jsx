import { NorthWindClient } from "@/components/api/NorthWindClient";
import React, { useState, useEffect } from "react";
import OrderGrid from "@/components/orders/OrderGrid";
import OrderItem from "@/components/orders/OrderItem";
import OrderForm from "@/components/orders/OrderForm";
import CloseIcon from "@/assets/icon/closeIcon.svg";
import useAlert from "@/hooks/useAlert";

const Orders = () => {
    const [orderList, setOrderList] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);
    const [newOrder, setNewOrder] = useState(false);
    const { setAlert, clearAlert } = useAlert();

    function viewOrder(toView){
        setOrderDetail(
            <OrderItem 
                order={toView} 
                orderListHandler={setOrderList}
                orderList={orderList}
                hideDetails={setOrderDetail}
            />
        )
    }

    function closeOrderView(){
        setOrderDetail(null);
    }

    function closeNewOrder(){
        setNewOrder(false);
    }

    function createNewOrder(){
        setNewOrder(true);
    }

    //Popualate Order grid with all orders
    useEffect(() => {
        NorthWindClient.get("order/all")
        .then(data => {
            setOrderList(data);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Order Grid", error.message);
        });
    }, [])

    if(orderDetail !== null){
        //Order Detail View
     return (
        <div className="h-100 text-white mt-2">
            <div className="d-flex justify-content-between bg-primary border rounded border-2 w-100">
                <div />
                <div className="">
                    <h1 className="display-1 p-2">Order Details</h1>
                </div>
                <div className="align-self-center">
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
    } else if (newOrder) {
        //New Order Form
        return (
            <div className="h-100 text-white p-5">
                <div className="d-flex">
                    <h1 className="display-1 p-2">New Order</h1>
                    <div className="align-self-start ms-auto">
                        <button 
                            type="button" 
                            className="btn btn__danger btn__close"
                            onClick={closeNewOrder}>
                            <img src={CloseIcon}/>
                        </button>
                    </div>
                </div>

                <OrderForm />
            </div>
        )
    } else{
        //Order Grid
        return(
            <div className="h-100">
                <h1 className="display-1 p-2 text-white">Orders</h1>
                <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
                <div className="d-flex px-4 gap-3 justify-content-start">
                    <div className="col-sm-auto">
                        <div className="d-flex pb-2">
                            <h1 className="p-2 text-white">Create</h1>
                            <div className="px-5 py-2">
                                <button 
                                    type="button" 
                                    className="btn btn-primary btn-long"
                                    onClick={createNewOrder}>
                                    New
                                </button>
                            </div>
                        </div>

                        <hr />
                    </div>
                </div>
                
                <div className="container-fluid px-4 pt-4">
                    <div className="row">
                        <OrderGrid allOrders={orderList} viewOrder={viewOrder}/>
                    </div>                 
                </div>
            </div>
        )
    }
};

export default Orders;