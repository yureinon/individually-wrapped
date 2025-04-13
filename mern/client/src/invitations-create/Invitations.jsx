function Invitation(props) {
  return (
    <span className="invite">
      <div className="sender">{props.sender}</div>
      <div className="check-icon"><i className="fa-solid fa-check"></i></div>
      <div className="x-icon"><i className="fa-solid fa-x"></i></div>
      {/* <div className="check-icon"><i className="fa-solid fa-check"></i></div> */}
    </span>
  )
}
  

export default Invitation;