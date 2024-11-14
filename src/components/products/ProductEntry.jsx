import { moneyString, percString } from "@/components/utility/DisplayHelpers"

const ProductEntry = (props) => {

    return (
        <div className="card bg-dark text-white col">
            <div className="card-header border-white">
                {props.prod.productName}
            </div>

            <div className="d-flex align-items-center justify-content-center bg-primary my-3 mx-2" style={{height:"200px"}}>
                Placeholder Img
            </div>
            
            <ul className="list-group list-group-flush border-white">
                <li className="list-group-item bg-dark text-white border-bottom-0">
                    <span className="float-start me-5">
                        Category
                    </span>
                    <span className="float-end ms-5">
                        {props.prod.categoryName}
                    </span>
                </li>
                <li className="list-group-item bg-dark text-white border-bottom-0">
                    <span className="float-start">
                        Item Price
                    </span>
                    <span className="float-end">
                        ${moneyString(props.prod.purchasePrice)}
                    </span>
                </li>
                <li className="list-group-item bg-dark text-white border-bottom-0">
                    <span className="float-start">
                        Quantity
                    </span>
                    
                    <span className="float-end">
                        {props.prod.quantity}
                    </span>
                </li>
                <li className="list-group-item bg-dark text-white border-white">
                    Cost
                </li>
                <li className="list-group-item bg-dark text-white border-bottom-0">
                    <span className="float-start">
                        Total
                    </span>
                    
                    <span className="float-end">
                    {`$${moneyString(props.prod.totalPrice)}`}
                    </span>
                </li>
                <li className="list-group-item bg-dark text-white border-bottom-0">
                    <span className="float-start">
                        Discount
                    </span>
                    
                    <span className="float-end">
                    {percString(props.prod.discount)}
                    </span>
                </li>
                <li className="list-group-item bg-dark text-white border-bottom-0">
                    <span className="float-start">
                        Final
                    </span>
                    
                    <span className="float-end">
                    {`$${moneyString(props.prod.finalPrice)}`}
                    </span>
                </li>
            </ul>
        </div>
    );    
}

export default ProductEntry;