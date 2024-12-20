//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import React, { useState, useEffect } from "react";
import useAlert from "@/hooks/useAlert";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import OrderForm_ClientInfo from "@/components/orders/new/OrderForm_ClientInfo";
import OrderForm_Products from "@/components/orders/new/OrderForm_Products";

const breadcrumbArr = [
    "client",
    "product",
    "shipping",
    "submit"
];

const NewOrder = () => {
    const [breadcrumb, setBreadcrumb] = useState("client");
    const [clientInfo, setClientInfo] = useState(null);
    const [productInfo, setProductInfo] = useState(null);

    function breadcrumb_class(crumb){
        if(breadcrumb === crumb) return "breadcrumb-active";

        const currentIndex = breadcrumbArr.indexOf(breadcrumb);
        const currentCrumb = breadcrumbArr.indexOf(crumb);

        if(currentIndex > currentCrumb){
            return "breadcrumb-previous";
        }else{
            return "breadcrumb-inactive";
        }
    }

    function nextStep_click(){
        const currentIndex = breadcrumbArr.indexOf(breadcrumb);
        const nextCrumb = breadcrumbArr[currentIndex + 1];
        setBreadcrumb(nextCrumb);
    }

    function nextStep_disabled(){
        switch(breadcrumb){
            case "client":
                return clientInfo == null;
            case "product":
                return productInfo == null;
        }
    }

    const Order_step = () => {
        switch(breadcrumb){
            case "client":
                return <OrderForm_ClientInfo client={clientInfo} setClient={setClientInfo}/>
            case "product":
                return <OrderForm_Products product={productInfo} setProduct={setProductInfo}/>
        }
    };

    return (
        <>
            <div className="h-100 text-white p-5">
                <div className="d-flex">
                    <h1 className="display-1 p-2">New Order</h1>
                </div>

                <div>
                    <a className={breadcrumb_class("client")}>Client Info</a> &nbsp;/&nbsp;
                    <a className={breadcrumb_class("product")}>Products</a> &nbsp;/&nbsp;
                    <a className={breadcrumb_class("shipping")}>Shipping</a> &nbsp;/&nbsp;
                    <a className={breadcrumb_class("submit")}>Submit</a> 

                    <div className="d-flex">
                        <div className="col-6 py-4">
                            <button 
                                type="button" 
                                className="btn btn-success btn-long float-start"
                                onClick={nextStep_click}
                                disabled={nextStep_disabled()}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                <hr />

            </div>

            <Order_step />
        </>
    )
}

export default NewOrder;