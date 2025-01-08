import React from "react";
import ClientCatalog from "@/components/clients/ClientCatalog";

const Customers = () => {
    return (
        <>
            <div className="pt-3">
                <h1 className="display-1 p-2 text-white text-center bg-warning border border-2">Client Catalog</h1>
                <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
                <div>
                    <ClientCatalog />
                </div>
            </div>
        </>
    );
};

export default Customers;