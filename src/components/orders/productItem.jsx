const ProductItem = (props) => {
    return (
        <>
            <div className="prodItem">
                <h2>Item {props.id}</h2>
                <label>
                    Name: {props.prod.productName}
                </label>
                <br />
                <label>
                    Category: {props.prod.categoryName}
                </label>
                <br />
                <label>
                    Quantity: {props.prod.quantity}
                </label>
                <br />
            </div>
        </>
    );    
}

export default ProductItem;