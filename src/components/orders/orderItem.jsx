import ProductItem from "@/components/orders/ProductItem";
import {nanoid} from "nanoid";
import { moneyString } from "@/components/utility/DisplayHelpers"

const OrderItem = (order) => {

    const prodList = order.value.items?.map((item, index) => (
        <ProductItem 
            id={index += 1}
            key={`prod_${nanoid()}`}
            prod={item} 
        />
    ));

    const orderCompleted = () => {
        return order.value.sendTo.shippedDate !== null;
    }

    return (
        <>
            <h3>
                <span className="badge bg-secondary mx-2">Status</span>
                <span className={`badge bg-${orderCompleted() ? "success" : "warning"} mx-2`}>
                    {orderCompleted() ? "Shipped" : "Incomplete"}
                </span>
            </h3>
                
            <hr className="text-white w-80 h-10" style={{height: "3px"}}/>

            <div className="orderItem pb-5">
                <h1>
                    Order
                    <span className="mx-4" style={{display: orderCompleted() ? "" : ""}}>
                        <button 
                            type="button" 
                            className="btn btn-success btn-long">
                            Ship
                        </button>
                    </span>
                </h1>
                <hr className="text-white w-75 h-10" style={{height: "3px"}}/>
                
                <div className="container m-0">
                    <div className="row row-cols-auto justify-content-start">
                        <div className="col-8 p-4 bg-dark border border-white">
                            <label>
                                <span className="badge bg-secondary m-2 float-start" style={{width:"100px"}}>Order ID</span>
                                <span className="badge bg-primary m-2 float-start">{order.value.orderId}</span>
                            </label>
                            <br />
                            <label>
                                <span className="badge bg-secondary m-2" style={{width:"100px"}}>Company</span>
                                <span className="badge bg-primary m-2">{order.value.orderedBy.companyName}</span>
                            </label>

                            <br />
                            <br />

                            <div>
                                <div className="d-flex justify-content-between">
                                    <label className="float-start">
                                        <span className="badge bg-secondary m-2" style={{width:"100px"}}>Address</span>
                                    </label>
                                    <label className="float-end">
                                        <span className="badge bg-secondary m-2" style={{width:"100px"}}>Subotal</span>
                                        <span className="badge bg-success m-2" style={{width:"100px"}}>${moneyString(order.value.orderSubtotal)}</span>
                                    </label>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label className="float-start">
                                        <span className="badge bg-primary m-2">{order.value.sendTo.address.street}</span>
                                        <span className="badge bg-primary mx-2">{order.value.sendTo.address.city}</span>
                                    </label>
                                    <label className="float-end">
                                        <span className="badge bg-secondary m-2" style={{width:"100px"}}>Shipping</span>
                                        <span className="badge bg-success m-2" style={{width:"100px"}}>${moneyString(order.value.sendTo.shipCost)}</span>
                                    </label>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="float-start">
                                        <span className="badge bg-primary m-2">{order.value.sendTo.address.postalCode}</span>
                                        <span className="badge bg-primary m-2">{order.value.sendTo.address.country}</span>
                                    </div>
                                    <div className="float-end">
                                        <span className="badge bg-secondary m-2" style={{width:"100px"}}>Total</span>
                                        <span className="badge bg-success m-2" style={{width:"100px"}}>${moneyString(order.value.orderTotal)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                

                <br />

                <h1>Products</h1>
                <hr className="text-white w-75 h-10" style={{height: "3px"}}/>
                <div className="row row-cols-auto gap-3">
                    {prodList}
                </div>

            </div>
            
        </>
    );
}

export default OrderItem;