//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import useAlert from "@/hooks/useAlert";
import { useState } from "react";
import useUser from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { NorthWindClient } from "@/components/api/NorthWindClient";

const ClientModal = (props) => {

    const { setAlert, clearAlert } = useAlert();
    const { token } = useUser();
    const navigate = useNavigate();

    const[client, setClient] = useState(props.client);

    const[formState, setFormState] = useState({
        street: client.address.street,
        city: client.address.city,
        postalCode: client.address.postalCode,
        country: client.address.country,
        region: client.address.region,

        contactName: client.contactInfo.contactName,
        contactTitle: client.contactInfo.contactTitle,
        phone: client.contactInfo.phone,
        fax: client.contactInfo.fax
    });

    const countryOptions = props.clientCountries?.map((item, index) => (
        <Dropdown.Item key={`country_${index}`} eventKey={item}>{item}</Dropdown.Item>
    ));

    function HandleSubmit(event){
        //Update values
        client.address.street = formState.street;
        client.address.city = formState.city;
        client.address.postalCode = formState.postalCode;
        client.address.country = formState.country;
        client.address.region = formState.region;

        client.contactInfo.contactName = formState.contactName;
        client.contactInfo.contactTitle = formState.contactTitle;
        client.contactInfo.phone = formState.phone;
        client.contactInfo.fax = formState.fax;

        //Send API update for this product modal
        NorthWindClient.put(`customer/update/${client.id}`, token, client)
        .then(data => {
            setClient(data);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Update Client", error.message);
            if(error.status === 401) navigate("/logout");
        });

        //Update parent state to refresh catalog
        let clients = [...props.catalogClients]
        props.catalogHandler(clients);

        props.hideModal();
    }

    function HandleFormChange(event){
        const value = event.target.value;
        setFormState({
            ...formState,
            [event.target.name]: value
        });
    }

    function HandleCountryDDLChange(eventKey){
        const selectedCountry = eventKey;
        const selectedRegion = props.clientCountryRegions.find(
            r => r.country === selectedCountry).region;

        setFormState({
            ...formState,
            region: selectedRegion,
            country: selectedCountry
        });
    }

    return (
        <Modal show={props.showModal} onHide={props.hideModal}>
            <Modal.Dialog>
                <Modal.Header className="bg-primary" closeButton>
                    <Modal.Title className="fs-3"> 
                        {client.companyName}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="bg-dark">
                    <p>
                        Update address or contact info
                    </p>

                    <hr />

                    <h1 className="m-2">Address</h1>

                    <div className="d-flex align-items-baseline m-2">
                        <div className="col-3">
                            Street
                        </div>
                        <div className="col-6">
                            <input 
                                type="text"
                                className="ms-2"
                                style={{width:"300px", height:"25px", fontSize:"15px"}}
                                id="currentStreet" 
                                name="street"
                                value={formState.street}
                                onChange={HandleFormChange}
                            />
                        </div>
                    </div>
                     
                    <div className="d-flex align-items-baseline m-2">
                        <div className="col-3">
                            City
                        </div>
                        <div className="col-6">
                            <input 
                                type="text"
                                className="ms-2"
                                style={{width:"200px", height:"25px", fontSize:"15px"}}
                                id="currentCity" 
                                name="city"
                                value={formState.city}
                                onChange={HandleFormChange}
                            />
                        </div>
                    </div>

                    <div className="d-flex align-items-baseline m-2">
                        <div className="col-3">
                            Postal Code
                        </div>
                        <div className="col-6">
                            <input 
                                type="text"
                                className="ms-2"
                                style={{width:"75px", height:"25px", fontSize:"15px"}}
                                id="currentZip" 
                                name="postalCode"
                                value={formState.postalCode}
                                onChange={HandleFormChange}
                            />
                        </div>
                    </div>

                    <div className="d-flex align-items-baseline m-2">
                        <div className="col-3">
                            Country
                        </div>
                        <div className="col-6">
                            <DropdownButton 
                                className="ms-2" 
                                id="countryDropdownBtn" 
                                variant="light"
                                size="sm"
                                name="country"
                                title={formState.country}
                                onSelect={HandleCountryDDLChange}>
                                {countryOptions}
                            </DropdownButton>

                        </div>
                    </div>

                    <div className="d-flex align-items-baseline m-2">
                        <div className="col-3">
                            Region
                        </div>
                        <div className="col-6">
                            <input 
                                type="text"
                                className="ms-2"
                                style={{width:"125px", height:"25px", fontSize:"15px"}}
                                id="currentRegion" 
                                name="region"
                                value={formState.region}
                                disabled
                            />
                        </div>
                    </div>

                    <hr />
                    
                    <h1 className="m-2">Contact Info</h1>

                    <div className="d-flex align-items-baseline m-2">
                        <div className="col-2">
                            Name
                        </div>
                        <div className="col-6">
                            <input 
                                type="text"
                                className="ms-2"
                                style={{width:"250px", height:"25px", fontSize:"15px"}}
                                id="currentName" 
                                name="contactName"
                                value={formState.contactName}
                                onChange={HandleFormChange}
                            />
                        </div>
                    </div>

                    <div className="d-flex align-items-baseline m-2">
                        <div className="col-2">
                            Title
                        </div>
                        <div className="col-6">
                            <input 
                                type="text"
                                className="ms-2"
                                style={{width:"250px", height:"25px", fontSize:"15px"}}
                                id="currentTitle" 
                                name="contactTitle"
                                value={formState.contactTitle}
                                onChange={HandleFormChange}
                            />
                        </div>
                    </div>

                    <div className="d-flex align-items-baseline m-2">
                        <div className="col-2">
                            Phone
                        </div>
                        <div className="col-6">
                            <input 
                                type="text"
                                className="ms-2"
                                style={{width:"120px", height:"25px", fontSize:"15px"}}
                                id="currentPhone" 
                                name="phone"
                                value={formState.phone}
                                onChange={HandleFormChange}
                            />
                        </div>
                    </div>

                    <div className="d-flex align-items-baseline m-2">
                        <div className="col-2">
                            Fax
                        </div>
                        <div className="col-6">
                            <input 
                                type="text"
                                className="ms-2"
                                style={{width:"120px", height:"25px", fontSize:"15px"}}
                                id="currentFax" 
                                name="fax"
                                value={formState.fax}
                                onChange={HandleFormChange}
                            />
                        </div>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-end">
                        <button 
                            type="submit" 
                            className="btn btn-success btn-long"
                            onClick={HandleSubmit}>
                            Submit
                        </button>
                    </div>
                    

                </Modal.Body>
            </Modal.Dialog>
        </Modal>
    );
}

export default ClientModal;