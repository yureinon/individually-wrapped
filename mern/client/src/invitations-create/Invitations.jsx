import {useNavigate} from 'react-router-dom';
function Invitation(props) {
  const navigate = useNavigate();
  const acceptInvite = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5050/api/v0/invite/${props.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        navigate('/home');
      })
      .catch((err) => {
        alert("Error accepting invite");
        console.log(err);
      });
  };
  return (
    <span className="invite">
      <div className="sender">{props.sender}</div>
      <div className="check-icon" onClick={acceptInvite}><i className="fa-solid fa-check"></i></div>
      <div className="x-icon"><i className="fa-solid fa-x"></i></div>
      {/* <div className="check-icon"><i className="fa-solid fa-check"></i></div> */}
    </span>
  )
}
  

export default Invitation;