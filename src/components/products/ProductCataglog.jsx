//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import useAlert from "@/hooks/useAlert";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { useState, useEffect, useCallback } from "react";
import { NorthWindClient } from "@/components/client/NorthWindClient";
import ProductEntry from "./ProductEntry";
import {nanoid} from "nanoid";
import CategoryBtn from "@/components/products/CategoryBtn";

const ProductCatalog = () => {
    const[products, setProducts] = useState(null);
    const[filteredProducts, setFilteredProducts] = useState(null);
    const[categoryFilter, setCategoryFilter] = useState("");
    const[inputProduct, setInputProduct] = useState("");
    
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
        filterCatalog();
        setCategoryFilter(categoryTxt);
    }, [products, filteredProducts]);

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

    const filterCatalog = () => {
        setFilteredProducts(products);

        //Category filter exists
        if(categoryFilter?.trim() !== ""){
            setFilteredProducts(products?.filter(item => item.categoryName === categoryFilter));
        }

        //Search filter exists
        if(inputProduct?.trim() !== ""){
            const match = filteredProducts?.filter(option => option.productName.toLowerCase().includes(inputProduct));
            if(match){
                setFilteredProducts(match);
            } 
        }
    }


    function handleProductChange(event){
        const value = event.target.value;
        setInputProduct(value.toLowerCase());

        filterCatalog();
    }

    const productSearch = (
        <div className="mb-3">
            <div className="input-group has-validation" style={{width: "500px"}}>
                <input 
                    type="text"
                    className={`form-control text-black`}
                    list="productList" 
                    id="searchProduct" 
                    placeholder="Type to search..."
                    value={inputProduct}
                    onChange={handleProductChange}
                />
            </div>
        </div>
    );
    
    return (
    <>
        <div className="orderItem">
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
                
                <hr className="text-white w-80" style={{height: "3px"}}/>
                <div className="row row-cols-auto justify-content-start pb-5">
                    {categoryBtns}
                </div>
            </div>
            <div>
                <div className="d-flex">
                    <h1 className="p-2 text-white">Search</h1>
                    <div className="px-5 py-2">
                        <button 
                            type="button" 
                            className="btn btn-warning btn-long"
                            onClick={() => setInputProduct("")}>
                            Clear
                        </button>
                    </div>
                </div>
                <hr className="text-white w-50" style={{height: "3px"}}/>
                {productSearch}
            </div>
        </div>

        <div className="container pb-5 pt-5">
            <div className="row row-cols-auto justify-content-start">
                {categoryFilter?.trim() == "" && inputProduct?.trim() == "" ? prodList : filteredList}
            </div>
        </div>
    </>
    );
}

export default ProductCatalog;