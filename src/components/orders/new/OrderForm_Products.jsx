//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import useAlert from "@/hooks/useAlert";
import { useState, useEffect } from "react";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { NorthWindClient } from "@/components/api/NorthWindClient";
import OrderForm_ProductEntry from "@/components/orders/new/OrderForm_ProductEntry";
import {nanoid} from "nanoid";


const OrderForm_Products = () => {
    const[allProducts, setAllProducts] = useState(null);
    const[cart, setCart] = useState([]);
    
    const { setAlert, clearAlert } = useAlert();

    //Product API GET
    useEffect(() => {
        NorthWindClient.get("product/all")
        .then(data => {
            const available = data.filter(p => p.inStock && !p.discontinued);
            setAllProducts(available);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Get Products", error.message);
        });
    }, []);

    const AddToCart = (item) => {
        if(item.inStock){
            let exists = cart.find(p => p.productId === item.productId);
            if(!exists){
                setCart((oldCart) => [...oldCart, item]);
            }
        }
    }

    const prodList = allProducts?.map((item, index) => (
        <OrderForm_ProductEntry 
            id={index += 1}
            key={`prod_${nanoid()}`}
            prod={item} 
            addCart={AddToCart}
        />
    ));

    const cartList = cart?.map((item, index) => (
        <>
            <div className="col-10">
                {item.productName}
            </div>
            <div className="col-2">
                {item.stockAmt}
            </div>
        </>
    ));

    return (
    <>
        <div className="d-flex pt-5">
            <div className="col-8">
                <div className="text-center">
                    <h1 className="text-decoration-underline">Products</h1>
                </div>
                <div className="container-fluid p-4">
                    <div className="row row-cols-auto justify-content-start">
                        {prodList}
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="text-center">
                    <h1 className="text-decoration-underline">Cart</h1>
                </div>
                <div className="bg-dark mt-4">
                    <div className="container-fluid p-4">
                        <div className="row row-cols-auto justify-content-start">
                            {cartList}
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </>
    );
}

export default OrderForm_Products;