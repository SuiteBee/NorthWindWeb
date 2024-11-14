import { moneyString, percString } from "@/components/utility/DisplayHelpers"

const ProductEntry = (props) => {

    return (
        <div className="card bg-dark text-white col-4">
            <div className="card-header border-white">
                {props.prod.productName}
            </div>

            <div className="d-flex border-white">
                <div className="col-4">
                    <div className="d-flex align-items-center justify-content-center bg-primary my-3 mx-2" style={{height:"100px", width:"100px"}}>
                        <label className="fs-4">Img</label>
                    </div>
                </div>
                <div className="col-8">
                    <ul className="list-group list-group-flush border-white my-3 mx-2">
                        <li className="list-group-item bg-dark text-white border-bottom-0">
                            {props.prod.categoryName}
                        </li>
                        <li className="list-group-item bg-dark text-white border-bottom-0">
                            <span className="float-start me-5">
                                Price
                            </span>
                            <span className="float-end ms-5">
                                ${moneyString(props.prod.itemPrice)}
                            </span>
                        </li>
                        <li className="list-group-item bg-dark text-white border-bottom-0">
                            <span className="float-start me-5">
                                Stock
                            </span>
                            <span className="float-end ms-5">
                                0
                            </span>
                        </li>
                    </ul>
                </div>
                
                
            </div>
            
        </div>
    );    
}

export default ProductEntry;