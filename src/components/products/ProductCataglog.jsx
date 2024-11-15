import { useState, useEffect, useCallback } from "react";
import { NorthWindClient } from "@/components/client/NorthWindClient";
import useAlert from "@/hooks/useAlert";
import ProductEntry from "./ProductEntry";
import {nanoid} from "nanoid";
import CategoryBtn from "@/components/products/CategoryBtn";

const ProductCatalog = () => {
    const[products, setProducts] = useState(null);
    const[filteredProducts, setFilteredProducts] = useState(null);
    const[categoryFilter, setCategoryFilter] = useState("");
    
    const { setAlert, clearAlert } = useAlert();

    let categoryValues = [
        "Beverages", 
        "Condiments", 
        "Confections", 
        "Dairy Products", 
        "Grains/Cereals", 
        "Meat/Poultry", 
        "Produce", 
        "Seafood"
    ]

    let categoryTexts = [
        "Beverages", 
        "Condiments", 
        "Confections", 
        "Dairy", 
        "Grains", 
        "Meat", 
        "Produce", 
        "Seafood"
    ]

    //Product API GET
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

    const filteredList = filteredProducts?.map((item, index) => (
        <ProductEntry 
            id={index += 1}
            key={`prodFilt_${nanoid()}`}
            prod={item} 
        />
    ));

    const filterProducts_click = useCallback((categoryTxt) => {
        setFilteredProducts(products?.filter(item => item.categoryName === categoryTxt));
        setCategoryFilter(categoryTxt);
    }, [products, categoryFilter, filteredProducts]);

    const categoryBtns = categoryValues?.map((cat, index) => (
        <CategoryBtn 
            btnText={categoryTexts[index]}
            btnValue={cat}
            btnEvent={filterProducts_click}
            btnActive={cat === categoryFilter}
            id={index += 1}
            key={`catButt_${categoryTexts[index]}`}
        />
    ));
    
    return (
    <>
        <div className="orderItem pb-5">
            <div>
                <div className="d-flex">
                    <h1 className="p-2 text-white">Categories</h1>
                    <div className="px-5 py-2">
                        <button 
                            type="button" 
                            className="btn btn-warning btn-long"
                            onClick={() => setCategoryFilter("")}>
                            Clear
                        </button>
                    </div>
                </div>
                
                <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
                <div className="d-flex gap-3 justify-content-start pb-5">
                    {categoryBtns}
                </div>
            </div>
            <div>
                <h1 className="p-2 text-white">Search</h1>
                <hr className="text-white w-80 h-10" style={{height: "3px"}}/>
            </div>
            <div className="row row-cols-auto gap-3">
                {categoryFilter?.trim() == "" ? prodList : filteredList}
            </div>
        </div>
    </>
    );
}

export default ProductCatalog;