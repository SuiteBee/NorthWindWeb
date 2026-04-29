//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import React, { useState, useEffect } from "react";
import useAlert from "@root/hooks/useAlert";
import { useNavigate } from "react-router-dom";
import useUser from "@root/hooks/useUser";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { newClientRequest } from "@root/components/api/models/NewClientRequest";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { NorthWindClient as api } from "@root/components/api/NorthWindClient";

const NewClient = () => {

    const[formState, setFormState] = useState({
        clientId: "",
        company: "",

        name: "",
        title: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
        region: "",

        phone: "",
        fax: ""
    });

    const[compIdentifiers, setCompIdentifiers] = useState(null);
    const[countryRegions, setCountryRegions] = useState(null);
    const[countries, setCountries] = useState(null);

    const { setAlert, clearAlert } = useAlert();
    const { token } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        //Unique Country Region Combinations
        api.get("customer/regions", token)
        .then(data => {
            setCountryRegions(data.regions);
            setCountries([...new Set(data.regions.map(item => item.country))]);
        })
        .catch(error => {
            clearAlert();
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Customer Regions", error.message);
            if(error.status === 401) navigate("/logout");
        });

        //List of existing company identifiers
        api.get("customer/all", token)
        .then(data => {
            setCompIdentifiers([...new Set(data.map(client => client.id))]);
        })
        .catch(error => {
            clearAlert();
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Customer Identifiers", error.message);
            if(error.status === 401) navigate("/logout");
        });
    }, []);

    const countryOptions = countries?.map((item, index) => (
        <Dropdown.Item key={`country_${index}`} eventKey={item}>{item}</Dropdown.Item>
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

    function HandleFormChange(event){
        const value = event.target.value;
        setFormState({
            ...formState,
            [event.target.name]: value
        });
    }

    function Validate() {
        if(formState.clientId.length != 5){
            setAlert("danger", "Validation", "Client ID needs to be 5 characters.");
            return false;
        }

        //Check for existing company id
        if(compIdentifiers.includes(formState.clientId)){
            setAlert("danger", "Duplicate", `Client ID ${formState.clientId} already exists.`);
            return false;
        }

        return true;
    }

    function HandleSubmit() {
        clearAlert();

        if(Validate()){
            const client = newClientRequest(formState);

            //Submit New client
            api.post("customer/create", token, client)
            .then(data => {
                clearAlert();
                setAlert("success", "Success", `Client ${data.id} Submitted`);
                
                //Navigate back to customers page
                navigate("/customers");
            })
            .catch(error => {
                clearAlert();
                console.error("Server Error", error);
                setAlert("danger", "Server Error: Submit Client", error.message);
                if(error.status === 401) navigate("/logout");
            });
        }
    }

    function enable_submit(){
        const validProps = (({fax, ...v}) => v)(formState);
        
        if(Object.values(validProps).every(s => !!s)){
            return false;
        }
        return true;
    }

    return (
        <>
            <div className="h-100 text-white p-5">
                <div className="d-flex">
                    <h1 className="display-1 p-2">New Client</h1>
                </div>

                <form>
                    <div className="container-fluid">
                        <div className="row row-cols-auto gap-5 pb-5">
                            <div className="col-12 col-lg-5">
                                <h1 className="fs-3 p-2 text-white text-center bg-primary border border-2">
                                    Company Info
                                </h1>
                                <label className="form-label">Client ID</label>
                                <div className="input-group pb-2 w-20">
                                    <input 
                                        type="text"
                                        className="form-control text-black"
                                        id="clientId" 
                                        name="clientId"
                                        value={formState.clientId}
                                        onChange={HandleFormChange}
                                        maxLength={5}
                                        minLength={5}
                                    />
                                </div>
                                <label className="form-label">Company</label>
                                <div className="input-group pb-2 w-50">
                                    <input 
                                        type="text"
                                        className="form-control text-black"
                                        id="company" 
                                        name="company"
                                        value={formState.company}
                                        onChange={HandleFormChange}
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-lg-5">
                                <h1 className="fs-3 p-2 text-white text-center bg-primary border border-2">
                                    Representative
                                </h1>
                                <label className="form-label">Name</label>
                                <div className="input-group pb-2 w-50">
                                    <input 
                                        type="text"
                                        className="form-control text-black"
                                        id="shipName" 
                                        name="name"
                                        value={formState.name}
                                        onChange={HandleFormChange}
                                    />
                                </div>

                                <label className="form-label">Title</label>
                                <div className="input-group pb-2 w-25">
                                    <input 
                                        type="text"
                                        className="form-control text-black"
                                        id="title" 
                                        name="title"
                                        value={formState.title}
                                        onChange={HandleFormChange}
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-lg-5">
                                <h1 className="fs-3 p-2 text-white text-center bg-primary border border-2">
                                    Location
                                </h1>
                                <label className="form-label">Address</label>
                                <div className="input-group pb-2 w-50">
                                    <input 
                                        type="text"
                                        className="form-control text-black"
                                        id="shipStreet" 
                                        name="street"
                                        value={formState.street}
                                        onChange={HandleFormChange}
                                    />
                                </div>

                                <div className="d-flex">
                                    <div className="col-7">
                                        <label className="form-label">City</label>
                                        <div className="input-group pb-2 w-75">
                                            <input 
                                                type="text"
                                                className="form-control text-black"
                                                id="shipCity" 
                                                name="city"
                                                value={formState.city}
                                                onChange={HandleFormChange}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="col-4">
                                        <label className="form-label">Postal Code</label>
                                        <div className="input-group pb-2">
                                            <input 
                                                type="text"
                                                className="form-control text-black"
                                                id="shipZip" 
                                                name="postalCode"
                                                value={formState.postalCode}
                                                onChange={HandleFormChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="d-flex">
                                    <div className="col-7">
                                        <label className="form-label">Country</label>
                                        <div className="input-group pb-2">
                                            <DropdownButton 
                                                className="border border-white" 
                                                id="countryDropdownBtn" 
                                                variant="light"
                                                size="sm"
                                                name="country"
                                                title={formState.country ? formState.country : "Select"}
                                                onSelect={HandleCountryDDLChange}>
                                                {countryOptions}
                                            </DropdownButton>
                                        </div>
                                    </div>
                                    
                                    <div className="col-4">
                                        <label className="form-label">Region</label>
                                        <div className="input-group pb-2">
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
                                
                            </div>

                            <div className="col-12 col-lg-5">
                                <h1 className="fs-3 p-2 text-white text-center bg-primary border border-2">
                                    Contact
                                </h1>

                                <label className="form-label">Phone</label>
                                <div className="input-group pb-2 w-30">
                                    <input 
                                        type="text"
                                        className="form-control text-black"
                                        id="phone" 
                                        name="phone"
                                        value={formState.phone}
                                        onChange={HandleFormChange}
                                    />
                                </div>

                                <label className="form-label">Fax</label>
                                <div className="input-group pb-2 w-30">
                                    <input 
                                        type="text"
                                        className="form-control text-black"
                                        id="fax" 
                                        name="fax"
                                        value={formState.fax}
                                        onChange={HandleFormChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex gap-3 mt-5 mb-3">
                        <div className="col-2">
                            <button 
                                type="button" 
                                className="btn btn-success btn-long float-start"
                                onClick={HandleSubmit}
                                disabled={enable_submit()}>
                                Submit
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default NewClient;