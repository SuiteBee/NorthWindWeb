//////////////////////////////////////////
//Components
//////////////////////////////////////////
import { moneyString, percString } from "@root/components/utility/DisplayHelpers"

//////////////////////////////////////////
//Assets
//////////////////////////////////////////
import ProduceImg from "@root/assets/products/apple.svg";
import GrainsImg from "@root/assets/products/bread.svg";
import ConfectionsImg from "@root/assets/products/donut.svg";
import BeveragesImg from "@root/assets/products/drink.svg";
import CondimentsImg from "@root/assets/products/jar.svg";
import SeafoodImg from "@root/assets/products/lobster.svg";
import MeatImg from "@root/assets/products/meat.svg";
import DairyImg from "@root/assets/products/milk.svg";

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


const ProductItem = (props) => {

    let icon = productIcons.find((icon) => icon.cat == props.prod.categoryName).img;
    let back = productBack.find((back) => back.cat == props.prod.categoryName).className;

    const ShowDiscount = (
        props.prod.discount > 0 &&
        <>    
            <li className="list-group-item bg-dark text-white border-bottom-0">
                <span className="float-start">
                    Discount
                </span>
                
                <span className="float-end">
                {percString(props.prod.discount)}
                </span>
            </li>
            <li className="list-group-item bg-dark text-white border-white">
                <span className="float-end">
                {`-$${moneyString(props.prod.discountAmt)}`}
                </span>
            </li>
        </>
    );

    const ShowSpace = (
        props.prod.discount <= 0 &&
        <>    
            <li className="list-group-item bg-dark text-white border-bottom-0 pt-5"></li>
            <li className="list-group-item bg-dark text-white border-white pt-5"></li>
        </>
    )

    return (
        <div className="card bg-dark text-white col">
            <div className="card-header bg-dark border-white">
                {props.prod.productName}
            </div>

            <div className={`d-flex align-items-center justify-content-center bg-${back} my-3 mx-2`} style={{height:"200px"}}>
                <img className="" style={{height:"100px", width:"100px"}} src={icon}></img>
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
                        ${moneyString(props.prod.itemPrice)}
                    </span>
                </li>
                <li className="list-group-item bg-dark text-white border-white">
                    <span className="float-start">
                        Quantity
                    </span>
                    
                    <span className="float-end">
                        {props.prod.quantity}
                    </span>
                </li>
                <li className="list-group-item bg-dark text-white border-bottom-0">
                    <span className="float-start">
                        Total
                    </span>
                    
                    <span className="float-end">
                    {`$${moneyString(props.prod.totalPrice)}`}
                    </span>
                </li>
                {ShowDiscount}
                {ShowSpace}
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

export default ProductItem;