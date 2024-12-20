import { moneyString } from "@/components/utility/DisplayHelpers";

const OrderForm_ProductCart = (props) => {

    return (
        <>
            <div className="row row-cols-auto justify-content-start">
                <div className="col-12">
                    {props.id}. <span className="text-decoration-underline">{props.prod.productName}</span>
                </div>
            </div>
            <div className="row row-cols-auto justify-content-start">
                <div className="col-2" />
                <div className="col-10">
                    Price: 
                    <br />
                    {moneyString(props.prod.itemPrice)} - {props.prod.discount}%
                    <div className="float-end">
                        ${moneyString(props.prod.discountPrice)}
                    </div>
                </div>
            </div>
            <div className="row row-cols-auto justify-content-start">
                <div className="col-2" />
                <div className="col-10">
                    Subtotal: 
                    <br />
                    {props.prod.quantity} x {moneyString(props.prod.discountPrice)}
                    <div className="float-end">
                        ${moneyString(props.prod.subtotal)}
                    </div>
                </div>
            </div>

            <br />
        </>
    );
}

export default OrderForm_ProductCart;