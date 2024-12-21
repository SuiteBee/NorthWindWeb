//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import { useState, useCallback, useEffect } from "react";
import useAlert from "@/hooks/useAlert";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { NorthWindClient } from "@/components/api/NorthWindClient";

const OrderForm_Submit = (props) => {
    const { setAlert, clearAlert } = useAlert();

    useEffect(() => {
        const newOrder = {
            client: props.client,
            products: props.products,
            shipping: props.shipping
        }
        //Submit New Order
        NorthWindClient.post("order/create", newOrder)
        .then(data => {
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Submit Order", error.message);
        });
    }, []);

    return (
        <form className="ps-5">
            <div className="d-flex gap-3 mb-3">
                <div className="col-6">
                    <input className="form-check-input align-text-bottom" type="checkbox" value="" 
                        checked={formState.useCompanyAddress} 
                        onClick={e => UseCompanyCheck_Click(e)}
                        onChange={e => UseCompanyCheck_Change(e)}
                    />
                    <label className="form-check-label mx-4">
                        Ship To Company Address
                    </label>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-6">
                    <label className="form-label">Name</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control ${formState.useCompanyAddress ? "text-black input-disabled" : "text-black"}`}
                            id="shipName" 
                            name="name"
                            value={formState.name}
                            disabled={formState.useCompanyAddress}
                            onChange={HandleFormChange}
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-4">
                    <label className="form-label">Address</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control ${formState.useCompanyAddress ? "text-black input-disabled" : "text-black"}`}
                            id="shipStreet" 
                            name="street"
                            value={formState.street}
                            disabled={formState.useCompanyAddress}
                            onChange={HandleFormChange}
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-3">
                    <label className="form-label">City</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control ${formState.useCompanyAddress ? "text-black input-disabled" : "text-black"}`}
                            id="shipCity" 
                            name="city"
                            value={formState.city}
                            disabled={formState.useCompanyAddress}
                            onChange={HandleFormChange}
                        />
                    </div>
                </div>
                <div className="col-2">
                    <label className="form-label">Postal Code</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className={`form-control ${formState.useCompanyAddress ? "text-black input-disabled" : "text-black"}`}
                            id="shipZip" 
                            name="postalCode"
                            value={formState.postalCode}
                            disabled={formState.useCompanyAddress}
                            onChange={HandleFormChange}
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-2">
                    <label className="form-label">Country</label>
                    <div className="input-group">
                        <DropdownButton 
                            className="border border-white" 
                            id="countryDropdownBtn" 
                            variant="light"
                            size="sm"
                            name="country"
                            title={formState.country}
                            onSelect={HandleCountryDDLChange}
                            disabled={formState.useCompanyAddress}>
                            {countryOptions}
                        </DropdownButton>
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-2">
                    <label className="form-label">Region</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control text-black input-disabled"
                            style={{width:"125px", height:"25px", fontSize:"15px"}}
                            id="currentRegion" 
                            name="region"
                            value={formState.region}
                            disabled
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex gap-3 mb-3">
                <div className="col-2">
                    <button 
                        type="button" 
                        className="btn btn-primary btn-long float-start"
                        onClick={saveForm_click}
                        style={{display: formState.useCompanyAddress ? "none" : ""}}
                        >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}

export default OrderForm_Submit;