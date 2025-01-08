import React from "react";
import ProductCatalog from "@/components/products/ProductCataglog";

const Products = () => {
    return (
        <>
            <div className="pt-2">
                <h1 className="display-1 p-2 text-white text-center bg-success border border-2">Product Catalog</h1>
                <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
                <div>
                    <ProductCatalog />
                </div>
            </div>
        </>  
    );
};

export default Products;