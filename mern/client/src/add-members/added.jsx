import '../styles/add-member.css'
// if other user confirmed invite, change to green checkmark, otherwise use the hourglass

function AddedMember(props) {
  return (
    <span className="addedmember">
      <div className="emailtext">{props.email}</div>
      {!props.accepted ? <div className="hourglass"><i class="fa fa-hourglass-half"></i></div>
      : <div className="checkmark"><i class="fa fa-check"></i></div>}
    </span>
  )
}

export default AddedMember;

