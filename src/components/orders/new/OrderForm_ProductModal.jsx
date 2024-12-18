//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import { useState, useEffect } from "react";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import Modal from "react-bootstrap/Modal";

const OrderForm_ProductModal = (props) => {

    const[product, setProduct] = useState(props.prod);
    
    const[discountPct, setDiscountPct] = useState(0);
    const[discountPrice, setDiscountPrice] = useState(props.prod.itemPrice);
    const[orderAmount, setOrderAmount] = useState(0);

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
        
    }

    function CalculateDiscount(val){
        let tmpPct = val / 100;
        let tmpDiscount = product.itemPrice * tmpPct;
        let tmpPrice = product.itemPrice - tmpDiscount;
        setDiscountPrice(tmpPrice);
    }

    function HandleDiscountChange(val){
        setDiscountPct(val);
        CalculateDiscount(val);
    }

    function HandleAmountChange(val){
        if(val > product.stockAmt){
            setOrderAmount(product.stockAmt);
        }else{
            setOrderAmount(val);
        }
    }

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
                        Select the quantity and optional discount for <span className="fw-bold">{product.productName}</span>
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
                            <p>
                                Mod Price
                            </p>
                        </div>
                        <div>
                            $
                            <input 
                                type="text"
                                className="ms-2"
                                style={{height:"25px", fontSize:"15px"}}
                                id="modPrice" 
                                value={discountPrice.toFixed(2)}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="d-flex align-items-baseline">
                        <div className="col-3">
                            <p>
                                Discount {discountPct}%
                            </p>
                        </div>
                        <div>
                            <input
                                type="range"
                                className="form-range"
                                min="0"
                                max="35"
                                step="1"
                                id="discountPct"
                                value={discountPct}
                                onChange={e => HandleDiscountChange(e.target.value)}
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
                                Order Amount
                            </p>
                        </div>
                        <div>
                            +
                            <input 
                                type="number"
                                min="1"
                                max={product.stockAmt}
                                step="1"
                                className="ms-2"
                                style={{height:"25px",width:"50px", fontSize:"15px"}}
                                id="orderAmount" 
                                value={orderAmount.toString()}
                                onChange={e => HandleAmountChange(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <hr />

                    <div className="d-flex justify-content-end">
                        <button 
                            type="submit" 
                            className="btn btn-success btn-long"
                            onClick={HandleSubmit}>
                            Buy
                        </button>
                    </div>
                    

                </Modal.Body>
            </Modal.Dialog>
        </Modal>
    );
}

export default OrderForm_ProductModal;