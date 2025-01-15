//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import React, { useState, useEffect } from "react";
import useAlert from "@/hooks/useAlert";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { NorthWindClient } from "@/components/api/NorthWindClient";
import OrderGrid from "@/components/orders/OrderGrid";
import OrderItem from "@/components/orders/OrderItem";
import CloseIcon from "@/assets/icon/closeIcon.svg";

const Orders = () => {
    const [orderList, setOrderList] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);

    const { setAlert, clearAlert } = useAlert();
    const { token } = useUser();
    const navigate = useNavigate();

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
    
    const newOrderClick = () => {
        navigate("/orders/new");
    }

    //Popualate Order grid with all orders
    useEffect(() => {
        NorthWindClient.get("order/all", token)
        .then(data => {
            setOrderList(data);
        })
        .catch(error => {
            clearAlert();
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Order Grid", error.message);
            if(error.status === 401) navigate("/logout");
        });
    }, [])

    if(orderDetail !== null){
        //Order Detail View
     return (
        <div className="h-100 text-white mt-2">
            <div className="d-flex justify-content-between p-2 bg-primary border border-2 border-dark">
                <div />
                <div className="align-self-center">
                    <h1 className="display-3 text-dark text-center" style={{fontFamily:"poppins", fontWeight:"500"}}>Order Details</h1>
                </div>
                <div>
                    <button 
                        type="button" 
                        className="orderItem-close"
                        onClick={closeOrderView}>
                        <img src={CloseIcon}/>
                    </button>
                </div>
            </div>
            {orderDetail}
        </div>
     )       
    } else {
        //Order Grid
        return(
            <div className="h-100 pt-3">
                <h1 className="pageHeader bg-primary">Orders</h1>
                <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
                <div className="d-flex px-4 gap-3 justify-content-start">
                    <div className="col-sm-auto">
                        <div className="d-flex pb-2">
                            <h1 className="p-2 text-white">Create</h1>
                            <div className="px-5 py-2">
                                <button 
                                    type="button" 
                                    className="btn btn-primary btn-long"
                                    onClick={newOrderClick}>
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