import '../styles/InvitationsCreate.css'
import nerdImg from '../assets/nerd.png'
import Invitation from './Invitations.jsx'
import {useNavigate} from 'react-router-dom';
import CreateHouse from './CreateHouse.jsx';
import React from 'react';


function InvitationsCreate() {
  const [invitations, setInvitations] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    getInvites();
  }, []);
  
  const getInvites = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5050/api/v0/invite/inbound`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        setInvitations(json);
      })
      .catch((err) => {
        if (err == 403) {
          navigate('/login')
        }
        console.log(err);
      });
  };

  return (
    <>
        <div className = "invitations-create">
          <button className="btn" onClick={() => navigate("/login")}><i className="fa fa-arrow-left"></i></button>
            <img src={nerdImg} />
            <CreateHouse />
            <div className = "invitations">
                <h1 className = "invitations-title">Invitations</h1>
                <div className = "invitations-list">
                  {invitations.map((invite, index) => (
                    <Invitation key={index} sender={invite.house.name} id={invite.id} />
                  ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default InvitationsCreate
