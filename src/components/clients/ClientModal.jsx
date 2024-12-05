//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import useAlert from "@/hooks/useAlert";
import { useState, useEffect } from "react";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import Modal from "react-bootstrap/Modal";
import { NorthWindClient } from "@/components/api/NorthWindClient";

const ClientModal = (props) => {

    const[client, setClient] = useState(props.client);
    const[newPrice, setNewPrice] = useState(0);
    const[manualPrice, setManualPrice] = useState(true);
    const[markupPrice, setMarkupPrice] = useState(100);
    const[addStock, setAddStock] = useState(0);

    const { setAlert, clearAlert } = useAlert();

    function HandleSubmit(event){
        //Update values

        
        //Send API update for this product modal
        NorthWindClient.put(`customer/update/${client.id}`, client)
        .then(data => {
            setProduct(data);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Update Client", error.message);
        });

        //Update parent state to refresh catalog
        let clients = [...props.catalogClients]
        props.catalogHandler(clients);

        props.hideModal();
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
                                value={client.address.street}
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
                                value={client.address.city}
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
                                value={client.address.postalCode}
                            />
                        </div>
                    </div>

                    <div className="d-flex align-items-baseline m-2">
                        <div className="col-3">
                            Country
                        </div>
                        <div className="col-6">
                            <input 
                                type="text"
                                className="ms-2"
                                style={{width:"150px", height:"25px", fontSize:"15px"}}
                                id="currentCountry" 
                                value={client.address.country}
                            />
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
                                style={{width:"250px", height:"25px", fontSize:"15px"}}
                                id="currentRegion" 
                                value={client.address.region}
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
                                value={client.contactInfo.contactName}
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
                                value={client.contactInfo.contactTitle}
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
                                value={client.contactInfo.phone}
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
                                value={client.contactInfo.fax}
                            />
                        </div>
                    </div>


                    <div className="d-flex align-items-baseline m-2">
                        <div className="col-2">
                            Website
                        </div>
                        <div className="col-6">
                            <input 
                                type="text"
                                className="ms-2"
                                style={{width:"120px", height:"25px", fontSize:"15px"}}
                                id="currentSite" 
                                value={client.contactInfo.website}
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