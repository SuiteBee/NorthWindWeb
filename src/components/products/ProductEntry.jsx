//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { moneyString } from "@/components/utility/DisplayHelpers"

//////////////////////////////////////////
//Assets
//////////////////////////////////////////
import ProduceImg from "@/assets/products/apple.svg";
import GrainsImg from "@/assets/products/bread.svg";
import ConfectionsImg from "@/assets/products/donut.svg";
import BeveragesImg from "@/assets/products/drink.svg";
import CondimentsImg from "@/assets/products/jar.svg";
import SeafoodImg from "@/assets/products/lobster.svg";
import MeatImg from "@/assets/products/meat.svg";
import DairyImg from "@/assets/products/milk.svg";

let productIcons = [
    { cat: "Produce", img: ProduceImg },
    { cat: "Grains/Cereals", img: GrainsImg },
    { cat: "Confections", img: ConfectionsImg },
    { cat: "Beverages", img: BeveragesImg },
    { cat: "Condiments", img: CondimentsImg },
    { cat: "Seafood", img: SeafoodImg },
    { cat: "Meat/Poultry", img: MeatImg },
    { cat: "Dairy Products", img: DairyImg }
]

let productBack = [
    { cat: "Produce", className: "primary" },
    { cat: "Grains/Cereals", className: "success" },
    { cat: "Confections", className: "success" },
    { cat: "Beverages", className: "warning" },
    { cat: "Condiments", className: "primary" },
    { cat: "Seafood", className: "info" },
    { cat: "Meat/Poultry", className: "warning" },
    { cat: "Dairy Products", className: "info" }
]

const ProductEntry = (props) => {

    let icon = productIcons.find((icon) => icon.cat == props.prod.categoryName).img;
    let back = productBack.find((back) => back.cat == props.prod.categoryName).className;

    return (
        <div className="card bg-dark text-white m-2" style={{width: "35rem"}}>
            <div className="card-header border-white">
                {props.prod.productName}
            </div>

            <div className="d-flex border-white">
                <div className="col-4">
                   <div className={`d-flex align-items-center justify-content-center bg-${back} my-3 mx-2`} style={{height:"100px", width:"100px"}}>
                        <img className="" style={{height:"50px", width:"50px"}} src={icon}></img>
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