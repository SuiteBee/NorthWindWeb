//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import { useState } from "react";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import ClientModal from "@/components/clients/ClientModal";

//////////////////////////////////////////
//Assets
//////////////////////////////////////////
import ProfileImg from "@/assets/icon/profileIcon.svg";

const ClientEntry = (props) => {
    const[showClientModal, setClientModal] = useState(false);

    return (
        <>
            <div className="card bg-dark text-white m-2" style={{width: "35rem"}} onClick={() => setClientModal(true)}>
                <div className="card-header bg-dark border-white">
                    {props.client.companyName}
                </div>

                <div className="d-flex">
                    <div className="col-4 border-light">
                        <div className={`d-flex align-items-center justify-content-center bg-secondary my-3 mx-2`} style={{height:"110px", width:"110px"}}>
                            <img className="" style={{height:"100px", width:"100px"}} src={ProfileImg}></img>
                        </div>
                    </div>
                    <div className="col-8">
                        <ul className="list-group list-group-flush border-white my-3 mx-2">
                            <li className="list-group-item bg-dark text-white border-bottom-0">
                                {props.client.contactInfo.contactName}
                            </li>
                            <li className="list-group-item bg-dark text-white border-bottom-0">
                                {props.client.contactInfo.contactTitle}
                            </li>
                        </ul>
                    </div>
                </div>

                <ul className="list-group list-group-flush border-white my-3 mx-2">
                    <li className="list-group-item bg-dark text-white border-bottom-0">
                        <span className="float-start me-5">
                            Contact
                        </span>
                        <span className="float-end ms-5">
                            {props.client.contactInfo.phone}
                        </span>
                    </li>
                    <li className="list-group-item bg-dark text-white border-bottom-0">
                        <span className="float-start me-5">
                            Region
                        </span>
                        <span className="float-end ms-5">
                            {props.client.address.region}
                        </span>
                    </li>
                </ul>
            </div>

            <ClientModal 
                showModal={showClientModal} 
                hideModal={setClientModal} 
                client={props.client}
                clientCountryRegions={props.clientCountryRegions}
                clientCountries={props.clientCountries} 
                catalogHandler={props.catalogHandler}
                catalogClients={props.catalogClients}
            />
        </>
        
    );    
}

export default ClientEntry;