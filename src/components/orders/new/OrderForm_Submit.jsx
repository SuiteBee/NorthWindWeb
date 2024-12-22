//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import useAlert from "@/hooks/useAlert";
import { useNavigate } from "react-router-dom";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { NorthWindClient } from "@/components/api/NorthWindClient";
import {nanoid} from "nanoid";
import OrderForm_SubmitCart from "@/components/orders/new/OrderForm_SubmitCart";
import { moneyString } from "@/components/utility/DisplayHelpers";
import { newOrder } from "@/components/api/models/NewOrderRequest";

const OrderForm_Submit = (props) => {
    const { setAlert, clearAlert } = useAlert();
    const navigate = useNavigate();

    function HandleSubmit(){
        const order = newOrder(props);
        
        //Submit New Order
        NorthWindClient.post("order/create", order)
        .then(data => {
            setAlert("success", "Success", `Order ${data.orderId} Submitted`);
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Submit Order", error.message);
        });

        //Navigate back to orders page
        navigate("/orders");
    }

    const cartList = props.product?.map((item, index) => (
        <OrderForm_SubmitCart 
            id={index += 1}
            key={`submitProd_${nanoid()}`}
            prod={item} 
        />
    ));

    function SumCart(){
        let sum = 0;
        props.product.forEach((item) => {
            const subtotal = item.quantity * item.discountPrice;
            sum += subtotal;
        });
        return sum + props.shipping.shipCost;
    }


    return (
        <form className="ps-5">
            <div className="display-3">
                Client Info
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-9 col-sm-8 col-lg-4">
                    <label className="form-label">Company</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="compName" 
                            value={props.client.companyName}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-9 col-sm-8 col-lg-4">
                    <label className="form-label">Address</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="compStreet" 
                            value={props.client.address.street}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-6 col-sm-6 col-lg-2">
                    <label className="form-label">City</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="compCity" 
                            value={props.client.address.city}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4 col-sm-4 col-lg-2">
                    <label className="form-label">Postal Code</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="compZip" 
                            value={props.client.address.postalCode}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-5 col-sm-5 col-lg-2">
                    <label className="form-label">Country</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="compCountry" 
                            value={props.client.address.country}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-5 col-sm-5 col-lg-2">
                    <label className="form-label">Region</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="compRegion" 
                            value={props.client.address.region}
                            disabled
                        />
                    </div>
                </div>
            </div>

            <hr />
            
            <div className="display-3">
                Shipping Info
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-9 col-sm-8 col-lg-4">
                    <label className="form-label">Carrier</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="shipCarrier" 
                            value={props.shipping.carrier}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-9 col-sm-8 col-lg-4">
                    <label className="form-label">Name</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="shipName" 
                            value={props.shipping.name}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-9 col-sm-8 col-lg-4">
                    <label className="form-label">Address</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="shipStreet" 
                            value={props.shipping.street}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-6 col-sm-6 col-lg-2">
                    <label className="form-label">City</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="shipCity" 
                            value={props.shipping.city}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-4 col-sm-4 col-lg-2">
                    <label className="form-label">Postal Code</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="shipZip" 
                            value={props.shipping.postalCode}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-5 col-sm-5 col-lg-2">
                    <label className="form-label">Country</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="shipCountry" 
                            value={props.shipping.country}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-5 col-sm-5 col-lg-2">
                    <label className="form-label">Region</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control text-black input-disabled`}
                            id="shipRegion" 
                            value={props.shipping.region}
                            disabled
                        />
                    </div>
                </div>
            </div>

            <hr />

            <div className="mb-4">
                <div className="display-3">
                    Cart
                </div>
                <div className="container-fluid p-4">
                    {cartList}
                </div>
                <div className="d-flex gap-3 p-4">
                    <div className="col-12">
                        <label className="form-label">Carrier</label>
                        <br />
                        <div className="float-start">
                            {props.shipping.carrier}
                        </div>
                        <div className="float-end">
                            ${moneyString(props.shipping.shipCost)}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="my-5">
                    <div className="ps-4 float-start">
                        <button 
                            type="button" 
                            className="btn btn-success btn-long float-start"
                            onClick={HandleSubmit}>
                            Submit
                        </button>
                    </div>
                    <div className="pe-4 float-end">
                        Total
                    </div>
                    <br />
                    <div className="pe-4 float-end">
                        ${moneyString(SumCart())}
                    </div>
                </div>
                
            </div>

            <br />
        </form>
    );
}

export default OrderForm_Submit;