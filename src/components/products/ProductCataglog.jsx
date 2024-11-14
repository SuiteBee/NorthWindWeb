import { useState, useEffect } from "react";
import { NorthWindClient } from "@/components/client/NorthWindClient";
import useAlert from "@/hooks/useAlert";
import ProductEntry from "./ProductEntry";
import {nanoid} from "nanoid";

const ProductCatalog = () => {
    const[products, setProducts] = useState(null);
    const[filter, setFilter] = useState(null);
    
    const { setAlert, clearAlert } = useAlert();

    let categories = [
        "Beverages", 
        "Condiments", 
        "Confections", 
        "Dairy", 
        "Grains", 
        "Meat", 
        "Produce", 
        "Seafood"
    ]

    const categoryBtn = (btnText) => ( 
        <div className="col-sm-auto">
            <button 
                type="button" 
                className="btn btn-outline-primary btn-long"
                onClick={filterProducts(btnText)}>
                {btnText}
            </button>
        </div>
    )

    const categoryFilter = categories?.map((cat, index) => (
        categoryBtn(cat)
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


    const prodList = products?.map((item, index) => (
        <ProductEntry 
            id={index += 1}
            key={`prod_${nanoid()}`}
            prod={item} 
        />
    ));

    const filteredList = filter?.map((item, index) => (
        <ProductEntry 
            id={index += 1}
            key={`prod_${nanoid()}`}
            prod={item} 
        />
    ));

    function filterProducts(categoryTxt){
        var filtered = products?.filter(item => item.category === categoryTxt)
        setFilter(filtered);
    }
    
    if(filter === null){
        return (
        <>
            <div className="orderItem pb-5">
                <div>
                    <h1 className="p-2 text-white">Categories</h1>
                    <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
                    <div className="d-flex gap-3 justify-content-start pb-5">
                        {categoryFilter}
                    </div>
                </div>
                <div>
                    <h1 className="p-2 text-white">Search</h1>
                    <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
                </div>
                <div className="row row-cols-auto gap-3">
                    {prodList}
                </div>
            </div>
        </>
        );
    } else {
        return (
        <>
            <div className="orderItem pb-5">
                <div>
                    <h1 className="p-2 text-white">Categories</h1>
                    <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
                    <div className="d-flex gap-3 justify-content-start pb-5">
                        {categoryFilter}
                    </div>
                </div>
                <div>
                    <h1 className="p-2 text-white">Search</h1>
                    <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
                </div>
                <div className="row row-cols-auto gap-3">
                    {filteredList}
                </div>
            </div>
        </>
        );
    }
}

export default ProductCatalog;