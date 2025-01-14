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
import Modal from "react-bootstrap/Modal";
import { NorthWindClient } from "@/components/api/NorthWindClient";

const ProductModal = (props) => {

    const[product, setProduct] = useState(props.prod);
    const[newPrice, setNewPrice] = useState(0);
    const[manualPrice, setManualPrice] = useState(true);
    const[markupPrice, setMarkupPrice] = useState(100);
    const[addStock, setAddStock] = useState(0);

    const { setAlert, clearAlert } = useAlert();
    const { token } = useUser();
    const navigate = useNavigate();

    //Apply markup  
    useEffect(() => {
        CalculateMarkup();
    }, [markupPrice]);

    const productTitle = () => {
        if(product.discontinued){
            return "danger";
        }else if (!product.inStock){
            return "warning";
        } else{
            return "success";
        }
    }

    const productStatus = () => {
        if(product.discontinued){
            return "Discontinued";
        }else if (!product.inStock){
            return "Out of Stock";
        } else{
            return "Available";
        }
    }


    function HandleSubmit(event){
        //Update values
        if(newPrice > 0) product.itemPrice = newPrice;
        product.stockAmt += addStock;
        
        //Send API update for this product modal
        NorthWindClient.put(`product/update/${product.productId}`, token, product)
        .then(data => {
            setProduct(data);
            clearAlert();
        })
        .catch(error => {
            console.error("Server Error", error);
            setAlert("danger", "Server Error: Update Price", error.message);
            if(error.status === 401) navigate("/logout");
        });

        //Reset modal to default
        setNewPrice(0);
        setManualPrice(true);
        setMarkupPrice(100);
        setAddStock(0);

        //Update parent state to refresh catalog
        let products = [...props.catalogProducts]
        props.catalogHandler(products);

        props.hideModal();
    }

    function CalculateMarkup() {
        if(!manualPrice){
            let tmpPrice = product.itemPrice;
            let tmpMarkup = markupPrice / 100;
            tmpPrice = (tmpPrice * tmpMarkup).toFixed(2);
            setNewPrice(Number(tmpPrice));
        }
    }

    function HandleNewPriceChange(val){
        //Reset markup when manually entering
        setManualPrice(true);
        setMarkupPrice(100);

        var tmpPrice = val === "" ? 0 : parseFloat(val);

        if(!tmpPrice && tmpPrice != 0) return;

        const reg = /(?<![\d.])(\d{1,4}|\d{0,4}\.\d{1,2})?(?![\d.])/
        if(reg.test(tmpPrice.toString())) setNewPrice(tmpPrice);
    }

    function HandleStockChange(val){
        //0 by default, set to 0 if backspace
        var tmpStock = val === "" ? 0 : parseInt(val, 10);

        //Don't process non-integer inputs
        if(!tmpStock && tmpStock != 0) return;

        //Digits with length up to 3
        const reg = /^[0-9]{1,3}$/
        if(reg.test(tmpStock.toString())) setAddStock(tmpStock);
    }

    function HandleMarkupChange(val){
        setManualPrice(false);
        setMarkupPrice(val); 
    }

    if(product.discontinued){
        return(
            <Modal show={props.showModal} onHide={props.hideModal}>
                <Modal.Dialog>
                    <Modal.Header className={`bg-${productTitle()}`} closeButton>
                        <Modal.Title className="fs-3"> 
                            {product.productName} is 
                            <span className="text-decoration-underline mx-2">
                                {productStatus()}
                            </span>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="bg-dark">
                        <p>
                            Unable to update product information for products that have been discontinued.
                        </p>
                        <p>
                            Contact your system admin if you think this has ocurred in error.
                        </p>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
        )
    }
    else{
        return (
            <Modal show={props.showModal} onHide={props.hideModal}>
                <Modal.Dialog>
                    <Modal.Header className={`bg-${productTitle()}`} closeButton>
                        <Modal.Title className="fs-3"> 
                            {product.productName} is 
                            <span className="text-decoration-underline mx-2">
                                {productStatus()}
                            </span>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="bg-dark">
                        <p>
                            Update or markup the price of <span className="fw-bold">{product.productName}</span>
                        </p>

                        <hr />

                        <div className="d-flex align-items-baseline">
                            <div className="col-3">
                                <p>
                                    Current Price
                                </p>
                            </div>
                            <div>
                                $
                                <input 
                                    type="text"
                                    className="ms-2"
                                    style={{height:"25px", fontSize:"15px"}}
                                    id="currentPrice" 
                                    value={product.itemPrice.toFixed(2)}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="d-flex align-items-baseline">
                            <div className="col-3">
                                <p className="align-text-baseline">
                                    New Price
                                </p>
                            </div>
                            <div>
                                $
                                <input 
                                    type="number"
                                    className="ms-2"
                                    style={{height:"25px", fontSize:"15px"}}
                                    id="newPrice" 
                                    value={newPrice}
                                    onChange={e => HandleNewPriceChange(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="d-flex align-items-baseline">
                            <div className="col-3">
                                <p>
                                    Markup {markupPrice}%
                                </p>
                            </div>
                            <div>
                                <input
                                    type="range"
                                    className="form-range"
                                    min="5"
                                    max="200"
                                    step="5"
                                    id="markupPrice"
                                    value={markupPrice}
                                    onChange={e => HandleMarkupChange(e.target.value)}
                                />
                            </div>
                        </div>

                        <hr />
                        
                        <div className="d-flex align-items-baseline">
                            <div className="col-3">
                                <p>
                                    Current Stock
                                </p>
                            </div>
                            <div>
                                <input 
                                    type="text"
                                    className="ms-4"
                                    style={{height:"25px",width:"50px", fontSize:"15px"}}
                                    id="currentStock" 
                                    value={product.stockAmt}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="d-flex align-items-baseline">
                            <div className="col-3">
                                <p className="align-text-baseline">
                                    Add Stock
                                </p>
                            </div>
                            <div>
                                +
                                <input 
                                    type="number"
                                    min="0"
                                    max="999"
                                    step="1"
                                    className="ms-2"
                                    style={{height:"25px",width:"50px", fontSize:"15px"}}
                                    id="addStock" 
                                    value={addStock.toString()}
                                    onChange={e => HandleStockChange(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <hr />

                        <div className="d-flex justify-content-end">
                            <button 
                                type="submit" 
                                className="btn btn-success btn-long"
                                onClick={HandleSubmit}>
                                Submit
                            </button>
                        </div>
                        

                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
        );
    }
}

export default ProductModal;