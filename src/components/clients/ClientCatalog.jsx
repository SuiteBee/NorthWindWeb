//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import useAlert from "@/hooks/useAlert";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { NorthWindClient } from "@/components/api/NorthWindClient";
import ClientEntry from "./ClientEntry";
import {nanoid} from "nanoid";
import CategoryBtn from "@/components/utility/CategoryBtn";

const ClientCatalog = () => {
    const[clients, setClients] = useState(null);
    const[filteredClients, setFilteredClients] = useState(null);

    const[countryRegions, setCountryRegions] = useState(null);
    const[countries, setCountries] = useState(null);
    const[regions, setRegions] = useState(null);

    const[regionFilter, setRegionFilter] = useState("");
    const[inputSearch, setInputSearch] = useState("");

    const { setAlert, clearAlert } = useAlert();
    const navigate = useNavigate();

    //Product API GET
    useEffect(() => {
        //Client List
        NorthWindClient.get("customer/all")
        .then(data => {
            setClients(data);
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Customer All", error.message);
        });

        //Unique Country Region Combinations
        NorthWindClient.get("customer/regions")
        .then(data => {
            setCountryRegions(data.regions);
            setCountries([...new Set(data.regions.map(item => item.country))]);
            setRegions([...new Set(data.regions.map(item => item.region))]);
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Customer Regions", error.message);
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
            //Check contact name
            const nameMatch = tmpFilter?.filter(
                option => option.contactInfo.contactName.toLowerCase().includes(inputSearch)
            );
            //Check company name
            const companyMatch = tmpFilter?.filter(
                option => option.companyName.toLowerCase().includes(inputSearch)
            );

            //Join two searches
            const match = nameMatch.concat(companyMatch);

            //Filter out duplicates from concat
            const unique = match.filter((value, index, arr) => index === arr.indexOf(value));

            if(unique){
                tmpFilter = unique;
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
            clientCountryRegions={countryRegions}
            clientCountries={countries} 
            catalogHandler={setClients}
            catalogClients={clients}
        />
    ));

    const filteredList = filteredClients?.map((item, index) => (
        <ClientEntry 
            id={index += 1}
            key={`clientFilt_${nanoid()}`}
            client={item} 
            clientCountryRegions={countryRegions}
            clientCountries={countries} 
            catalogHandler={setClients}
            catalogClients={clients}
        />
    ));

    const regionBtns = regions?.map((item, index) => (
        <CategoryBtn 
            btnText={item}
            btnValue={item}
            btnEvent={setRegionFilter}
            btnActive={item === regionFilter}
            id={index += 1}
            key={`regionButt_${index}`}
            btnStyle={{height:"60px"}}
        />
    ));

    const clientSearch = (
        <div className="pb-3">
            <div style={{width: "400px"}}>
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

    const newClientClick = () => {
        navigate("/customers/new");
    }
    
    return (
    <>
        <div className="orderItem">
            <div>
                <div className="d-flex">
                    <h1 className="p-2 text-white">Create</h1>
                    <div className="px-6 py-2">
                        <button 
                            type="button" 
                            className="btn btn-primary btn-long"
                            onClick={newClientClick}>
                            New
                        </button>
                    </div>
                </div>

                <hr />
            </div>
            <div>
                <div className="d-flex pb-2">
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
                
                <div className="row row-cols-auto justify-content-start">
                    {regionBtns}
                </div>
                <hr />
            </div>
            <div>
                <div className="d-flex pb-2">
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
                {clientSearch}
                <hr />
            </div>
            <div className="text-center fst-italic text-decoration-underline pt-3">
                Click on any client entry to update address or contact info
            </div>
        </div>

        <div className="container-fluid p-4">
            <div className="row row-cols-auto justify-content-start">
                {regionFilter?.trim() == "" && inputSearch?.trim() == "" ? clientList : filteredList}
            </div>
        </div>
    </>
    );
}

export default ClientCatalog;