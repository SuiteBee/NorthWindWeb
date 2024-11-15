const CategoryBtn = (props) => {
    return (
        <div className="col-sm-auto">
            <button 
                type="button" 
                className={`btn btn${props.btnActive ? "" : "-outline"}-primary btn-long`}
                onClick={() => props.btnEvent(props.btnValue)}>
                {props.btnText}
            </button>
        </div>
    );
};

export default CategoryBtn;