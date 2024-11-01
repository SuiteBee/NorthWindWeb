function FilterButton(props){
    return(
        <button id={props.id} type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>{props.name}</span>
          <span className="visually-hidden"> tasks</span>
        </button>
    );
}

export default FilterButton;