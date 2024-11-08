const OrderForm = (order) => {

    return (
        <>
            <div className="orderItem">
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
                <br />

                <h1>Products</h1>
                {prodList}
            </div>
            
        </>
    );
}

export default OrderForm;