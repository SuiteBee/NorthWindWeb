//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import useAlert from "@/hooks/useAlert";
import { useState, useEffect } from "react";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { moneyString } from "@/components/utility/DisplayHelpers"
import Modal from "react-bootstrap/Modal";

const ProductModal = (props) => {

    const[newPrice, setNewPrice] = useState(0);
    const[markupPrice, setMarkupPrice] = useState(100);
    const[addStock, setAddStock] = useState(0);

    //Apply markup  
    useEffect(() => {
        CalculateMarkup();
    }, [markupPrice]);

    const productTitle = () => {
        if(props.prod.discontinued){
            return "danger";
        }else if (!props.prod.inStock){
            return "warning";
        } else{
            return "success";
        }
    }

    const productStatus = () => {
        if(props.prod.discontinued){
            return "Discontinued";
        }else if (!props.prod.inStock){
            return "Out of Stock";
        } else{
            return "Available";
        }
    }


    function handleSubmit(event){
        alert(`Submitting newPrice:${newPrice} markupPrice:${markupPrice} addStock:${addStock}`);
    }

    function CalculateMarkup() {
        let tmpPrice = props.prod.itemPrice;
        let tmpMarkup = markupPrice / 100;
        tmpPrice = (tmpPrice * tmpMarkup).toFixed(2);
        setNewPrice(tmpPrice);
    }

    if(props.prod.discontinued){
        return(
            <Modal show={props.showModal} onHide={props.hideModal}>
                <Modal.Dialog>
                    <Modal.Header className={`bg-${productTitle()}`} closeButton>
                        <Modal.Title className="fs-3"> 
                            {props.prod.productName} is 
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
                            {props.prod.productName} is 
                            <span className="text-decoration-underline mx-2">
                                {productStatus()}
                            </span>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="bg-dark">
                        <p>
                            Update or markup the price of <span className="fw-bold">{props.prod.productName}</span>
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
                                    value={props.prod.itemPrice.toFixed(2)}
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
                                    onChange={e => setNewPrice(e.target.value)}
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
                                    class="form-range"
                                    min="5"
                                    max="200"
                                    step="5"
                                    id="markupPrice"
                                    value={markupPrice}
                                    onChange={e => setMarkupPrice(e.target.value)}
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
                                    value={props.prod.stockAmt}
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
                                    value={addStock}
                                    onChange={e => setAddStock(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <hr />

                        <div className="d-flex justify-content-end">
                            <button 
                                type="submit" 
                                className="btn btn-success btn-long"
                                onClick={handleSubmit}>
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