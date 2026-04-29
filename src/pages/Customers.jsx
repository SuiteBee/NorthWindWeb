import React from "react";
import ClientCatalog from "@root/components/clients/ClientCatalog";

const Customers = () => {
    return (
        <>
            <div className="pt-3">
                <h1 className="pageHeader bg-warning">Client Catalog</h1>
                <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
                <div>
                    <ClientCatalog />
                </div>
            </div>
        </>
    );
};

export default Customers;