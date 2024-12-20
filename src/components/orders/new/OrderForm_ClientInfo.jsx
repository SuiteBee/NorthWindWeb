import { useState, useEffect } from "react";
import { NorthWindClient } from "@/components/api/NorthWindClient";
import useAlert from "@/hooks/useAlert";

const OrderForm_ClientInfo = (props) => {
    const[companies, setCompanies] = useState(null);
    const[inputCompany, setInputCompany] = useState(props.client?.companyName);
    const[selectedCompany, setSelectedCompany] = useState(props.client);

    const[companyName, setCompanyName] = useState(props.client?.companyName);
    const[companyStreet, setCompanyStreet] = useState(props.client?.address.street);
    const[companyCity, setCompanyCity] = useState(props.client?.address.city);
    const[companyZip, setCompanyZip] = useState(props.client?.address.postalCode);
    const[companyCountry, setCompanyCountry] = useState(props.client?.address.country);
    const[companyRegion, setCompanyRegion] = useState(props.client?.address.region);

    const { setAlert, clearAlert } = useAlert();

    function handleCompanyChange(event){
        const value = event.target.value;
        setInputCompany(value);

        const match = companies?.find(option => option.id === value);
        if(match){
            setInputCompany(match.companyName);
            setSelectedCompany(match.id);

            //Set Company Address Info
            setCompanyName(match.companyName);
            setCompanyStreet(match.address.street);
            setCompanyCity(match.address.city);
            setCompanyZip(match.address.postalCode);
            setCompanyCountry(match.address.country);
            setCompanyRegion(match.address.region);

            props.setClient(match);
        } else{
            setSelectedCompany(null);

            setCompanyName("");
            setCompanyStreet("");
            setCompanyCity("");
            setCompanyZip("");
            setCompanyCountry("");
            setCompanyRegion("");

            props.setClient(null);
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
        <form className="ps-5" onSubmit={handleSubmit}>
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
                            className="form-control text-black input-disabled"
                            id="CompanyName" 
                            value={companyName}
                            disabled
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
                            className="form-control text-black input-disabled"
                            id="CompanyStreet" 
                            value={companyStreet}
                            disabled
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
                            className="form-control text-black input-disabled"
                            id="CompanyCity" 
                            value={companyCity}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-2">
                    <label className="form-label">Postal Code</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control text-black input-disabled"
                            id="CompanyZip" 
                            value={companyZip}
                            disabled
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
                            className="form-control text-black input-disabled"
                            id="CompanyCountry" 
                            value={companyCountry}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-3">
                    <label className="form-label">Region</label>
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control text-black input-disabled"
                            id="CompanyRegion" 
                            value={companyRegion}
                            disabled
                        />
                    </div>
                </div>
            </div>

            {/*
            <input className="form-check-input" type="checkbox" value="" checked/>
            <label className="form-check-label mx-2">
                Ship To This Address
            </label>
            */}
        </form>
    );
}

export default OrderForm_ClientInfo;