//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import React, { useState, useEffect, useCallback } from "react";
import useAlert from "@/hooks/useAlert";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import OrderForm_ClientInfo from "@/components/orders/new/OrderForm_ClientInfo";
import OrderForm_Products from "@/components/orders/new/OrderForm_Products";
import OrderForm_Shipping from "@/components/orders/new/OrderForm_Shipping";

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
    const [shippingInfo, setShippingInfo] = useState(null);
    const [shippingComplete, setShippingComplete] = useState(true);

    useEffect(() => {
        if(breadcrumb === "shipping"){
            const validProps = (({useCompanyAddress, ...v}) => v)(shippingInfo);
            setShippingComplete(Object.values(validProps).every(s => !!s));
        }
    }, [shippingInfo]);

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

    function breadcrumb_click(crumb){
        const currentIndex = breadcrumbArr.indexOf(breadcrumb);
        const currentCrumb = breadcrumbArr.indexOf(crumb);

        if(currentIndex > currentCrumb){
            setBreadcrumb(crumb);
        }
    }

    function nextStep_click(){
        const currentIndex = breadcrumbArr.indexOf(breadcrumb);
        const nextCrumb = breadcrumbArr[currentIndex + 1];
        setBreadcrumb(nextCrumb);

        if(nextCrumb === "shipping" && !shippingInfo){
            const initialShipping = {
                useCompanyAddress: true,
                name: clientInfo.companyName,
                street: clientInfo.address.street,
                city: clientInfo.address.city,
                postalCode: clientInfo.address.postalCode,
                country: clientInfo.address.country,
                region: clientInfo.address.region
            }

            setShippingInfo(initialShipping);
        }
    }

    function nextStep_disabled(){
        switch(breadcrumb){
            case "client":
                return clientInfo == null;
            case "product":
                return productInfo == null;
            case "shipping":
                return shippingInfo == null || !shippingComplete;
        }
    }

    const Order_step = () => {
        switch(breadcrumb){
            case "client":
                return <OrderForm_ClientInfo client={clientInfo} setClient={setClientInfo}/>
            case "product":
                return <OrderForm_Products product={productInfo} setProduct={setProductInfo}/>
            case "shipping":
                return <OrderForm_Shipping client={clientInfo} shipping={shippingInfo} setShipping={setShippingInfo}/>
        }
    };

    return (
        <>
            <div className="h-100 text-white p-5">
                <div className="d-flex">
                    <h1 className="display-1 p-2">New Order</h1>
                </div>

                <div>
                    <a className={breadcrumb_class("client")} onClick={() => breadcrumb_click("client")}>Client Info</a> &nbsp;/&nbsp;
                    <a className={breadcrumb_class("product")} onClick={() => breadcrumb_click("product")}>Products</a> &nbsp;/&nbsp;
                    <a className={breadcrumb_class("shipping")} onClick={() => breadcrumb_click("shipping")}>Shipping</a> &nbsp;/&nbsp;
                    <a className={breadcrumb_class("submit")} onClick={() => breadcrumb_click("submit")}>Submit</a> 

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