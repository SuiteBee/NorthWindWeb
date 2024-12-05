//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import useAlert from "@/hooks/useAlert";
import { useState, useEffect } from "react";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { NorthWindClient } from "@/components/api/NorthWindClient";
import ClientEntry from "./ClientEntry";
import {nanoid} from "nanoid";
import CategoryBtn from "@/components/utility/CategoryBtn";

let regions = [
    "Western Europe",
    "Central America",
    "British Isles",
    "Northern Europe",
    "Southern Europe",
    "North America",
    "South America",
    "Scandinavia",
    "Eastern Europe"
];

const ClientCatalog = () => {
    const[clients, setClients] = useState(null);
    const[filteredClients, setFilteredClients] = useState(null);
    const[regionFilter, setRegionFilter] = useState("");
    const[inputSearch, setInputSearch] = useState("");

    const { setAlert, clearAlert } = useAlert();

    //Product API GET
    useEffect(() => {
        NorthWindClient.get("customer/all")
        .then(data => {
            setClients(data);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Get Clients", error.message);
        });
    }, [])

    //Apply category/search filters    
    useEffect(() => {
        filterClients();
    }, [regionFilter, inputSearch]);

    function filterClients() {
        let tmpFilter = clients;

         //Region filter exists
         if(regionFilter?.trim() !== ""){
            tmpFilter = tmpFilter?.filter(item => item.address.region === regionFilter);
        }

        //Search filter exists
        if(inputSearch?.trim() !== ""){
            const nameMatch = tmpFilter?.filter(
                option => option.contactInfo.contactName.toLowerCase().includes(inputSearch)
            );

            const companyMatch = tmpFilter?.filter(
                option => option.companyName.toLowerCase().includes(inputSearch)
            );

            const match = nameMatch.concat(companyMatch);

            if(match){
                tmpFilter = match;
            } 
        }

        setFilteredClients(tmpFilter);
    }

    function handleInputChange(event){
        const value = event.target.value;
        setInputSearch(value.toLowerCase());
    }

    const clientList = clients?.map((item, index) => (
        <ClientEntry 
            id={index += 1}
            key={`client_${nanoid()}`}
            client={item} 
            catalogHandler={setClients}
            catalogClients={clients}
        />
    ));

    const filteredList = filteredClients?.map((item, index) => (
        <ClientEntry 
            id={index += 1}
            key={`clientFilt_${nanoid()}`}
            client={item} 
        />
    ));

    const regionBtns = regions?.map((value, index) => (
        <CategoryBtn 
            btnText={value}
            btnValue={value}
            btnEvent={setRegionFilter}
            btnActive={value === regionFilter}
            id={index += 1}
            key={`regionButt_${index}`}
            btnStyle={{height:"60px"}}
        />
    ));

    const clientSearch = (
        <div className="mb-3">
            <div style={{width: "500px"}}>
                <input 
                    type="text"
                    className="form-control text-black"
                    style={{height:"30px", fontSize:"15px"}}
                    id="searchClient" 
                    placeholder="Type to search..."
                    value={inputSearch}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
    
    return (
    <>
        <div className="orderItem">
            <div>
                <div className="d-flex">
                    <h1 className="p-2 text-white">Regions</h1>
                    <div className="px-5 py-2">
                        <button 
                            type="button" 
                            className="btn btn-warning btn-long"
                            onClick={() => setRegionFilter("")}>
                            Clear
                        </button>
                    </div>
                </div>
                
                <hr className="text-white w-80" style={{height: "3px"}}/>
                <div className="row row-cols-auto justify-content-start pb-5">
                    {regionBtns}
                </div>
            </div>
            <div>
                <div className="d-flex">
                    <h1 className="p-2 text-white">Search</h1>
                    <div className="px-5 py-2">
                        <button 
                            type="button" 
                            className="btn btn-warning btn-long"
                            onClick={() => setInputSearch("")}>
                            Clear
                        </button>
                    </div>
                </div>
                <hr className="text-white w-50" style={{height: "3px"}}/>
                {clientSearch}
            </div>
            <div className="text-center fst-italic pt-5">
                Click on any client entry to update address or contact info
            </div>
        </div>

        <div className="container pb-5 pt-5">
            <div className="row row-cols-auto justify-content-start">
                {regionFilter?.trim() == "" && inputSearch?.trim() == "" ? clientList : filteredList}
            </div>
        </div>
    </>
    );
}

export default ClientCatalog;