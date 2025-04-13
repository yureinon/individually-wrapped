function Roommate(props) {
    return (
      <span className="roommate">
        {props.status === "dnd" ? (
          <div className="icon" id="dnd">
            <i className="fa-solid fa-moon"></i>
          </div>
        ) : props.status === "away" ? (
          <div className="icon">
            <i className="fa-solid fa-person-walking-arrow-right"></i>
          </div>
        ) : props.status === "asleep" ? (
          <div className="icon">
            <i className="fa-solid fa-bed"></i>
          </div>
        ) : props.status === "free" ? (
          <div className="icon" id="free">
            <i className="fa-solid fa-circle"></i>
          </div>
        ) : (
          <div className="icon">
            <i className="fa-solid fa-question"></i>
          </div>
        )}
        <div className="chore-name">{props.roommate_name}</div>
      </span>
    );
  }
  

export default Roommate;