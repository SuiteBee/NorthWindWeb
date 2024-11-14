import React from "react";
import ProductCatalog from "@/components/products/ProductCataglog";

const Products = () => {
    return (
        <>
            <div>
                <h1 className="display-1 p-2 text-white">Product Catalog</h1>
                <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
                <div>
                    <ProductCatalog />
                </div>
            </div>
        </>  
    );
};

export default Products;