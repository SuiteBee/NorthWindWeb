//////////////////////////////////////////
//Hooks
//////////////////////////////////////////
import useAlert from "@/hooks/useAlert";
import { useState } from "react";
import useUser from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

//////////////////////////////////////////
//Components
//////////////////////////////////////////
import Modal from "react-bootstrap/Modal";
import { NorthWindClient as api } from "@/components/api/NorthWindLocalClient";

const DetailModal = (props) => {

    const { setAlert, clearAlert } = useAlert();
    const { token } = useUser();
    const navigate = useNavigate();
    
    const[order, setOrder] = useState(props.order);

    function HandleSubmit(event){

        if(props.action === "ship"){

            let orderIndex = props.orderList.indexOf(order);

            //API PUT - Update ship date and set model
            api.put(`order/ship/${order.orderId}`, token)
            .then(data => {
                setOrder(data);

                //Update parent state to refresh order list
                let orderList = [...props.orderList]
                if(orderIndex) {
                    orderList[orderIndex] = data;
                }
                props.orderListHandler(orderList);

                clearAlert();
            })
            .catch(error => {
                console.error("Server Error", error);
                setAlert("danger", "Server Error: Ship Order", error.message);
                if(error.status === 401) navigate("/logout");
            });
        } else if(props.action === "delete"){

            let orderIndex = props.orderList.indexOf(order);

            //API Delete - Delete pending order record
            api.delete(`order/delete/${order.orderId}`, token)
            .then(() => {
                clearAlert();
                setAlert("success", "Success", `Order ${order.orderId} Removed`);
            })
            .catch(error => {
                console.error("Server Error", error);
                setAlert("danger", "Server Error: Delete Order", error.message);
                if(error.status === 401) navigate("/logout");
            });

            //Remove record from array
            let orderList = [...props.orderList]
            if(orderIndex) {
                orderList.splice(orderIndex, 1);
            }
            props.orderListHandler(orderList);

            clearAlert();
        }

        //Hide modal and detail view
        props.hideModal();
        props.hideDetails(null);
    }

    if(props.action === "ship"){
        return (
            <Modal show={props.showModal} onHide={props.hideModal}>
                <Modal.Dialog>
                    <Modal.Header className="bg-primary" closeButton>
                        <Modal.Title className="fs-3"> 
                            Ship Order {order.orderId}
                        </Modal.Title>
                    </Modal.Header>
    
                    <Modal.Body className="bg-dark">
                        <p>
                            Mark Order {order.orderId} Shipped as of Today?
                        </p>
    
                        <div className="d-flex justify-content-end">
                            <button 
                                type="button" 
                                className="btn btn-secondary btn-long m-2"
                                onClick={ (e) => props.hideModal()}>
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-success btn-long m-2"
                                onClick={HandleSubmit}>
                                Confirm
                            </button>
                        </div>

                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
        );
    } else if(props.action === "delete"){
        return (
            <Modal show={props.showModal} onHide={props.hideModal}>
                <Modal.Dialog>
                    <Modal.Header className="bg-danger" closeButton>
                        <Modal.Title className="fs-3"> 
                            Delete Order {order.orderId}
                        </Modal.Title>
                    </Modal.Header>
    
                    <Modal.Body className="bg-dark">
                        <p>
                            Remove Pending Order {order.orderId}?
                        </p>
    
                        <div className="d-flex justify-content-end">
                            <button 
                                type="button" 
                                className="btn btn-secondary btn-long m-2"
                                onClick={ (e) => props.hideModal()}>
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-success btn-long m-2"
                                onClick={HandleSubmit}>
                                Confirm
                            </button>
                        </div>

                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
        );
    }
}

export default DetailModal;