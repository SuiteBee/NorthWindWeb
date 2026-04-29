import { moneyString } from "@root/components/utility/DisplayHelpers";

const OrderForm_SubmitCart = (props) => {

    const discountAmount = (
        props.prod.discount > 0 ? ` - ${props.prod.discount}%` : ""
    );

    const showDiscountLine = (
        {display: props.prod.discount > 0 ? "" : "none"}
    );

    return (
        <>
            <div className="row row-cols-auto justify-content-start">
                <div className="col-1">
                    {props.id}.
                </div>
                <div className="col-11 text-decoration-underline">
                    {props.prod.productName}
                </div>
            </div>
            <div className="row row-cols-auto justify-content-start">
                <div className="col-1" />
                <div className="col-11 fs-3">
                    Price:&nbsp;
                    {moneyString(props.prod.itemPrice)} {discountAmount}
                </div>
            </div>
            
            <div className="row row-cols-auto justify-content-start" style={showDiscountLine}>
                <div className="col-1" />
                <div className="col-11 fs-3">
                    Cost:&nbsp;
                    ${moneyString(props.prod.discountPrice)}
                </div>
            </div>
            <div className="row row-cols-auto justify-content-start">
                <div className="col-1" />
                <div className="col-11 fs-3">
                    Subtotal:&nbsp; 
                    {props.prod.quantity} x {moneyString(props.prod.discountPrice)}
                    <div className="float-end">
                        ${moneyString(props.prod.subtotal)}
                    </div>
                </div>
            </div>
            <br />

            <hr />
        </>
    );
}

export default OrderForm_SubmitCart;