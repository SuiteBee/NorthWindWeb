import ProductItem from "@/components/orders/ProductItem";
import {nanoid} from "nanoid";

const OrderItem = (order) => {

    const prodList = order.value.products?.map((item, index) => (
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

            <div className="orderItem">
                <h1>Order</h1>
                <div className="ps-4">
                    <label>
                        Order ID: {order.value.orderId}
                    </label>
                    <br />
                    <label>
                        Company: {order.value.orderedBy.companyName}
                    </label>
                    <br />
                    <label>
                        Order Total: {order.value.orderTotal.toLocaleString('en-US', {minimumFractionDigits: 2}) }
                    </label>

                    <div className="py-3" style={{display: orderCompleted() ? "none" : ""}}>
                        <button 
                            type="button" 
                            className="btn btn-success btn-long" 
                            onClick={{}}>
                            Ship
                        </button>
                    </div>
                </div>

                <br />

                <h1>Products</h1>
                {prodList}
            </div>
            
        </>
    );
}

export default OrderItem;