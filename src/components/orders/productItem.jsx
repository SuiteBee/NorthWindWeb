const ProductItem = (props) => {
    return (
        <>
            <div className="prodItem">
                <h2>Item: {props.id}</h2>
                <div className="ps-4">
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
                </div>
                
                <br />
            </div>
        </>
    );    
}

export default ProductItem;