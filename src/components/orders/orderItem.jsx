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

    return (
        <>
            <hr />

            <div className="orderItem pb-5">
                <div className="d-flex justify-content-between">
                    <div className="col-9">
                        <h1>
                            Order {order.value.orderId}
                        </h1>
                        <hr />
                        <div className="badge bg-secondary mx-2">Status</div>
                        <div className={`badge bg-${order.value.fulfilled ? "success" : "warning"} mx-2`}>
                            {order.value.fulfilled ? "Shipped" : "Incomplete"}
                        </div>

                        <div className="bg-dark border rounded border-white mt-4">
                            <div className="d-flex justify-content-between">
                                <div className="col-6">
                                    <div className="container ps-5 pt-5">
                                        <div className="row gap-2 justify-content-start my-2">
                                            <h1>Sales Rep</h1>
                                        </div>
                                        <div className="row gap-2 justify-content-start my-2">
                                            <div className="col-2 badge bg-secondary">Name</div>
                                            <div className="col-2 badge bg-info">{order.value.completedBy.firstName}</div>
                                            <div className="col-2 badge bg-info">{order.value.completedBy.lastName}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="col-6">
                                    <div className="container p-5">
                                        <div className="row gap-2 justify-content-start my-2">
                                            <h1>Shipping Info</h1>
                                        </div>
                                        <div className="row gap-2 justify-content-start my-2">
                                            <div className="col-4 badge bg-secondary">Company</div>
                                            <div className="col-6 badge bg-info">{order.value.orderedBy.companyName}</div>
                                        </div>
                                        <div className="row gap-2 justify-content-start my-2">
                                            <div className="col-4 badge bg-secondary">Address</div>
                                        </div>
                                        <div className="row gap-2 justify-content-start my-2">
                                            <div className="col-4 badge bg-info">{order.value.sendTo.address.street}</div>
                                            <div className="col-4 badge bg-info">{order.value.sendTo.address.city}</div>
                                        </div>
                                        <div className="row gap-2 justify-content-start my-2">
                                            <div className="col-3 badge bg-info">{order.value.sendTo.address.postalCode}</div>
                                            <div className="col-4 badge bg-info">{order.value.sendTo.address.country}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="container p-5">
                                        <div className="row gap-2 justify-content-start my-2">
                                            <h1>Price Breakdown</h1>
                                        </div>
                                        <div className="row gap-2 justify-content-start my-2">
                                            <div className="col-3 badge bg-secondary">Items</div>
                                            <div className="col-3 badge bg-success">{order.value.items.length}</div>
                                        </div>
                                        <div className="row gap-2 justify-content-start my-2">
                                            <div className="col-3 badge bg-secondary">Subotal</div>
                                            <div className="col-3 badge bg-success">${moneyString(order.value.orderSubtotal)}</div>
                                        </div>
                                        <div className="row gap-2 justify-content-start my-2">
                                            <div className="col-3 badge bg-secondary">Shipping</div>
                                            <div className="col-3 badge bg-success">${moneyString(order.value.sendTo.shipCost)}</div>
                                        </div>
                                        <div className="row gap-2 justify-content-start my-2">
                                            <div className="col-3 badge bg-secondary">Total</div>
                                            <div className="col-3 badge bg-success">${moneyString(order.value.orderTotal)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <h1 className="text-center">
                            Actions
                        </h1>
                        <hr />
                        <div className="container">
                            <div className="row justify-content-center my-2" style={{display: order.value.fulfilled ? "none" : ""}}>
                                <button 
                                    type="button" 
                                    className="btn btn-success btn-long">
                                    Ship
                                </button>
                            </div>
                            <div className="row justify-content-center my-2" style={{display: order.value.fulfilled ? "none" : ""}}>
                                <button 
                                    type="button" 
                                    className="btn btn-danger btn-long">
                                    Delete
                                </button>
                            </div>
                            <div className="row justify-content-center my-2" style={{display: order.value.fulfilled ? "" : "none"}}>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary btn-long">
                                    None
                                </button>
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