//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import useAlert from "@/hooks/useAlert";
import { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { NorthWindClient as api } from "@/components/api/NorthWindLocalClient";
import OrderForm_ProductEntry from "@/components/orders/new/OrderForm_ProductEntry";
import OrderForm_ProductCart from "@/components/orders/new/OrderForm_ProductCart";
import {nanoid} from "nanoid";
import { moneyString } from "@/components/utility/DisplayHelpers";

//////////////////////////////////////////
//Bootstrap
//////////////////////////////////////////
import Offcanvas from 'react-bootstrap/Offcanvas';

//////////////////////////////////////////
//Assets
//////////////////////////////////////////
import CloseIcon from "@/assets/icon/closeIcon.svg";
import CartIcon from "@/assets/icon/shopCartIcon.svg";

const OrderForm_Products = (props) => {
    const[allProducts, setAllProducts] = useState(null);
    const[cart, setCart] = useState([]);

    const [showCart, setShowCart] = useState(false);
    const handleCloseCart = () => setShowCart(false);
    const handleShowCart = () => setShowCart(true);
    
    const { setAlert, clearAlert } = useAlert();
    const { token } = useUser();
    const navigate = useNavigate();

    //Product API GET
    useEffect(() => {
        api.get("product/all", token)
        .then(data => {
            const available = data.filter(p => p.inStock && !p.discontinued);
            setAllProducts(available);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Get Products", error.message);
            if(error.status === 401) navigate("/logout");
        });
    }, []);

    //Check for existing productInfo when initializing cart
    useEffect(() => {
        if(props.product) {
            setShowCart(props.cartOpen);
            setCart(props.product);
        } else{
            setCart([]);
        }
    }, []);

    const AddToCart = (item) => {
        const existingItem = cart.find(p => p.productId === item.productId);
        if(!existingItem){
            setCart([...cart, item]);

            props.setCartOpen(showCart);
            props.setProduct([...cart, item]);
        } else {
            const cartIndex = cart.findIndex(p => p.productId === item.productId);
            const cartSwap = [...cart];
            cartSwap[cartIndex] = item;

            props.setCartOpen(showCart);
            props.setProduct(cartSwap);
        }
    }

    const RemoveFromCart = (item) => {
        const existingItem = cart.find(p => p.productId === item.productId);
        if(existingItem){
            if(cart.length == 1){
                props.setCartOpen(false);
                props.setProduct(null);
            }else{
                const cartIndex = cart.findIndex(p => p.productId === item.productId);
                const altCart = cart.toSpliced(cartIndex, 1);

                props.setCartOpen(showCart);
                props.setProduct(altCart);
            }
        }
    }

    const CartQuantity = (productId) => {
        const cartProd = cart.find(p => p.productId === productId);
        return cartProd ? cartProd.quantity : 0;
    }

    const CartDiscount = (productId) => {
        const cartProd = cart.find(p => p.productId === productId);
        return cartProd ? cartProd.discount : 0;
    }

    const prodList = allProducts?.map((item, index) => (
        <OrderForm_ProductEntry 
            id={index += 1}
            key={`prod_${nanoid()}`}
            prod={item} 
            quantity={CartQuantity(item.productId)}
            discount={CartDiscount(item.productId)}
            handleAddCart={AddToCart}
        />
    ));
    
    const cartList = cart?.map((item, index) => (
        <OrderForm_ProductCart
            id={index += 1}
            key={`cart_${nanoid()}`}
            prod={item}
            remove={RemoveFromCart}
        />
    ));

    function SumCart(){
        let sum = 0;
        cart.forEach((item) => {
            const subtotal = item.quantity * item.discountPrice;
            sum += subtotal;
        });
        return sum;
    }

    return (
    <>
        <div className="d-flex ps-2 pe-8">
            <div className="col-10">
                <div className="text-center">
                    <h1 className="text-decoration-underline">Products</h1>
                </div>
                <div className="container-fluid p-4">
                    <div className="row row-cols-auto justify-content-start">
                        {prodList}
                    </div>
                </div>
            </div>
        </div>

        <div className="position-fixed top-0 end-0">
            <div className="pe-4 pt-9">
                <div className="rounded bg-success" style={{display: cart.length > 0 ? "" : "none"}}>
                    <button className="btn-default" type="button" onClick={handleShowCart}>
                        <img src={CartIcon}></img>
                    </button>
                </div>
            </div>
        </div>
        
        <Offcanvas className="bg-dark mt-7 pt-5 z-0" show={showCart} onHide={handleCloseCart} placement="end" backdrop={false} scroll={true}>
            <Offcanvas.Header className="justify-content-between border-bottom m-2">
            <div className="display-1 text-white">Cart</div>
            <div>
                <button className="btn-default" type="button" onClick={handleCloseCart}>
                    <img src={CloseIcon}></img>
                </button>
            </div>
            
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="bg-dark pb-5">
                    <div className="container-fluid p-4">
                        {cartList}
                    </div>
                    <div className="pe-4 float-end">
                        Total
                    </div>
                    <br />
                    <div className="pe-4 float-end">
                        ${moneyString(SumCart())}
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    </>
    );
}

export default OrderForm_Products;