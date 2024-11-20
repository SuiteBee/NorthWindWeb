import { useState, useEffect } from "react";
import { NorthWindClient } from "@/components/client/NorthWindClient";
import useAlert from "@/hooks/useAlert";

const OrderForm = () => {
    const[companies, setCompanies] = useState(null);
    const[inputCompany, setInputCompany] = useState("");
    const[selectedCompany, setSelectedCompany] = useState(null);

    const[inputShipName, setInputShipName] = useState("");
    const[inputStreet, setInputStreet] = useState("");
    const[inputCity, setInputCity] = useState("");
    const[inputZip, setInputZip] = useState("");
    const[inputCountry, setInputCountry] = useState("");
    const[inputRegion, setInputRegion] = useState("");

    const { setAlert, clearAlert } = useAlert();

    function handleCompanyChange(event){
        const value = event.target.value;
        setInputCompany(value);

        const match = companies?.find(option => option.id === value);
        if(match){
            setInputCompany(match.companyName)
            setSelectedCompany(match.id);
        } else{
            setSelectedCompany(null);
        }
    }

    function companyValidation(){
        if(inputCompany !== "" && selectedCompany === null){
            return "is-invalid"
        } else if (selectedCompany !== null){
            return "is-valid"
        } else {
            return ""
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        props.onSubmit(name);
        setName("");
    }

    //Popualate Company DataList
    useEffect(() => {
        NorthWindClient.get("customer/all")
        .then(data => {
            setCompanies(data);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Client List", error.message);
        });
    }, [])

    const companySearch = (
        <div className="mb-3">
            <label className="form-label">Company</label>
            <div className="input-group has-validation">
                <input 
                    type="text"
                    className={`form-control ${companyValidation()} text-black`}
                    list="companyList" 
                    id="selectedCompany" 
                    placeholder="Type to search..."
                    value={inputCompany}
                    onChange={handleCompanyChange}
                />
                <div id="validationCompany" className="invalid-feedback">
                    Must be registered as a client first.
                </div>
                <datalist id="companyList">
                    {companies?.map((comp, index) => (
                        <option key={`comp_${index}`} value={comp?.id}>
                            {comp.companyName}
                        </option>
                    ))}
                </datalist>
            </div>
            
        </div>
    );

    return (
        <form className="px-2" onSubmit={handleSubmit}>
            <hr className="text-white w-50" style={{height: "3px"}}/>
            <div className="d-flex">
                <div className="col-6">
                    {companySearch}   
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-6">
                    <label className="form-label">Name</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control"
                            id="ShipName" 
                            value={inputShipName}
                            onChange={(e) => setInputShipName(e.target.value)}
                            required
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
                            className="form-control"
                            id="ShipStreet" 
                            value={inputStreet}
                            onChange={(e) => setInputStreet(e.target.value)}
                            required
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
                            className="form-control"
                            id="ShipCity" 
                            value={inputCity}
                            onChange={(e) => setInputCity(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="col-2">
                    <label className="form-label">Postal Code</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control"
                            id="ShipZip" 
                            value={inputZip}
                            onChange={(e) => setInputZip(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <div className="col-2">
                    <label className="form-label">Country</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control"
                            id="ShipZip" 
                            value={inputCountry}
                            onChange={(e) => setInputCountry(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="col-3">
                    <label className="form-label">Region</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control"
                            id="ShipRegion" 
                            value={inputRegion}
                            onChange={(e) => setInputRegion(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default OrderForm;