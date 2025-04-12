function Invitation(props) {
//     return (
//       <span className="invite">
//         <div className="sender">{props.sender}</div>
//         <div className="icon"><i className="fa-solid fa-arrow-left"></i></div>
//       </span>
//     );
//   }

  return (
    <span className="invite">
      <div className="sender">{props.sender}</div>
      <div className="icon"><i className="fa fa-hourglass-half"></i></div>
    </span>
  )
}
  

export default Invitation;