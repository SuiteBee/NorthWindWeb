//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import { useState, useEffect } from "react";
import useAlert from "@/hooks/useAlert";
import useUser from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { NorthWindClient as api } from "@/components/api/NorthWindLocalClient";

const OrderForm_Shipping = (props) => {
    const[company, setCompany] = useState(props.client);
    const[shippingInfo, setShippingInfo] = useState(props.shipping);

    const[formState, setFormState] = useState({
        useCompanyAddress: shippingInfo?.useCompanyAddress,
        carrier: shippingInfo?.carrier,
        carrierId: shippingInfo?.carrierId,
        shipCost: shippingInfo?.shipCost,
        name: shippingInfo?.name,
        street: shippingInfo?.street,
        city: shippingInfo?.city,
        postalCode: shippingInfo?.postalCode,
        country: shippingInfo?.country,
        region: shippingInfo?.region
    });

    const[countryRegions, setCountryRegions] = useState(null);
    const[countries, setCountries] = useState(null);
    const[carriers, setCarriers] = useState(null);

    const { setAlert, clearAlert } = useAlert();
    const { token } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        //Unique Country Region Combinations
        api.get("customer/regions", token)
        .then(data => {
            setCountryRegions(data.regions);
            setCountries([...new Set(data.regions.map(item => item.country))]);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Customer Regions", error.message);
            if(error.status === 401) navigate("/logout");
        });

        //Shipping Options
        api.get("order/carriers", token)
        .then(data => {
            setCarriers(data.carriers);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Shipping Carriers", error.message);
            if(error.status === 401) navigate("/logout");
        });
    }, []);

    const countryOptions = countries?.map((item, index) => (
        <Dropdown.Item key={`country_${index}`} eventKey={item}>{item}</Dropdown.Item>
    ));

    const carrierOptions = carriers?.map((item, index) => (
        <Dropdown.Item key={`carrier_${index}`} eventKey={item.companyName} value={item.id}>{item.companyName}</Dropdown.Item>
    ));

    function HandleCountryDDLChange(eventKey){
        const selectedCountry = eventKey;
        const selectedRegion = countryRegions.find(
            r => r.country === selectedCountry).region;

        setFormState({
            ...formState,
            region: selectedRegion,
            country: selectedCountry
        });
    }

    function HandleCarrierDDLChange(eventKey){
        const selectedCarrier = eventKey;
        const selectedId = carriers.find(c => c.companyName === eventKey).id;
        setFormState({
            ...formState,
            carrier: selectedCarrier,
            carrierId: selectedId
        });

        props.setShipping({
            ...formState,
            carrier: selectedCarrier,
            carrierId: selectedId
        });
    }

    function HandleShipCostChange(val){
        var tmpCost = val === "" ? 0 : parseFloat(val);

        if(!tmpCost && tmpCost != 0) return;

        const reg = /(?<![\d.])(\d{1,4}|\d{0,4}\.\d{1,2})?(?![\d.])/
        if(reg.test(tmpCost.toString())) {
            setFormState({
                ...formState,
                ["shipCost"]: tmpCost
            });
        } 
    }

    function UseCompanyCheck_Click(e){
        setFormState({
            ...formState,
            useCompanyAddress: e.target.checked
        });
    }

    function UseCompanyCheck_Change(e){
        if(e.target.checked){
            const newShipping = {
                ...formState,
                useCompanyAddress: true,
                name: company.companyName,
                street: company.address.street,
                city: company.address.city,
                postalCode: company.address.postalCode,
                country: company.address.country,
                region: company.address.region
            }
            setFormState({
                newShipping
            });
            props.setShipping(newShipping);
        } else {
            const newShipping = {
                ...formState,
                useCompanyAddress: false,
                name: "",
                street: "",
                city: "",
                postalCode: "",
                country: "",
                region: ""
            }
            setFormState({
                newShipping
            });
            props.setShipping(newShipping);
        }
    }

    function HandleFormChange(event){
        const value = event.target.value;
        setFormState({
            ...formState,
            [event.target.name]: value
        });
    }

    function saveForm_click(event){
        clearAlert();
        
        const validProps = (({useCompanyAddress, ...v}) => v)(formState);
        if(Object.values(validProps).every(s => !!s)){
            props.setShipping(formState);
            clearAlert();
        } else{
            setAlert("danger", "Validation", "Please fill out all fields to save address.");
        }
    }

    return (
        <form className="ps-5">
            <div className="d-flex gap-3 mb-3">
                <div className="col-2">
                    <label className="form-label">Carrier</label>
                    <div className="input-group">
                        <DropdownButton 
                            className="border border-white" 
                            id="carrierDropdownBtn" 
                            variant="light"
                            size="sm"
                            name="carrier"
                            title={formState.carrier ? formState.carrier : "Select"}
                            onSelect={HandleCarrierDDLChange}>
                            {carrierOptions}
                        </DropdownButton>
                    </div>
                </div>           
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-4 col-sm-3 col-lg-2">
                    <label className="form-label">Ship Cost</label>
                    <div className="input-group">
                        <input 
                            type="number"
                            className="form-control text-black"
                            id="cost" 
                            name="shipCost"
                            value={formState.shipCost}
                            onChange={e => HandleShipCostChange(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-9 col-sm-8 col-lg-4">
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
                <div className="col-9 col-sm-8 col-lg-4">
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
                <div className="col-9 col-sm-8 col-lg-4">
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
                <div className="col-6 col-sm-6 col-lg-2">
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
                <div className="col-4 col-sm-4 col-lg-2">
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
                <div className="col-5 col-sm-5 col-lg-2">
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
                        >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}

export default OrderForm_Shipping;