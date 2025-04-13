function Chore(props) {
    return (
      <div className="chore1">
        <h4 className="assigned">{props.assigned}</h4>
        <span className="chore-line">
          {!props.completed ? (
            <div className="x-icon"><i className="fa fa-x"></i></div>
          ) : (
            <div className="check-icon"><i className="fa fa-check"></i></div>
          )}
          <div className="chore-name-text">{props.chore_name}</div>
        </span>
      </div>
    );
  }
  
  export default Chore;
  