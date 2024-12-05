const CategoryBtn = (props) => {
    return (
        <div className="col-sm-auto my-2">
            <button 
                type="button" 
                className={`btn btn${props.btnActive ? "" : "-outline"}-primary btn-long`}
                onClick={() => props.btnEvent(props.btnValue)}
                style={props.btnStyle}>
                {props.btnText}
            </button>
        </div>
    );
};

export default CategoryBtn;