import { useState, useEffect } from "react";
import { NorthWindClient } from "@/components/client/NorthWindClient";
import useAlert from "@/hooks/useAlert";
import ProductEntry from "./ProductEntry";

const ProductCatalog = () => {
    const[products, setProducts] = useState(null);
    const { setAlert, clearAlert } = useAlert();

    const prodList = (filters) => products?.map((item, index) => (
        <ProductEntry 
            id={index += 1}
            key={`prod_${nanoid()}`}
            prod={item} 
        />
    ));

    //Popualate Company DataList
    useEffect(() => {
        NorthWindClient.get("product/all")
        .then(data => {
            setProducts(data);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Get Products", error.message);
        });
    }, [])


    return (
        <>
            <div className="orderItem pb-5">
                <h1>Product Catalog</h1>
                <hr className="text-white w-50 h-10" style={{height: "3px"}}/>
                <div className="row row-cols-auto gap-3">
                    {prodList}
                </div>

            </div>
            
        </>
    );
}

export default ProductCatalog;