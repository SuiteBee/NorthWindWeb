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
                <h1>Order</h1>
                <hr className="text-white w-50 h-10" style={{height: "3px"}}/>
                <div className="ps-4 w-50">
                    <label>
                        Order ID: {order.value.orderId}
                    </label>
                    <br />
                    <label>
                        Company: {order.value.orderedBy.companyName}
                    </label>
                    <br />
                    <br />
                    <div className="ps-4">
                        <label>
                            Subotal: ${moneyString(order.value.orderSubtotal)}
                        </label>
                        <br />
                        <label>
                            Freight: ${moneyString(order.value.sendTo.shipCost)}
                        </label>
                        <br />
                        <label>
                            Total: ${moneyString(order.value.orderTotal)}
                        </label>

                        <div className="py-3" style={{display: orderCompleted() ? "none" : ""}}>
                            <button 
                                type="button" 
                                className="btn btn-success btn-long">
                                Ship
                            </button>
                        </div>
                    </div>
                </div>

                <br />

                <h1>Products</h1>
                <hr className="text-white w-50 h-10" style={{height: "3px"}}/>
                <div className="row row-cols-auto gap-3">
                    {prodList}
                </div>

            </div>
            
        </>
    );
}

export default OrderItem;