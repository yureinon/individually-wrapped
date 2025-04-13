import React from 'react'
import '../styles/add-member.css'
import nerdImg from '../assets/nerd.png'
import AddedMember from './added';
import { useNavigate } from 'react-router-dom';

function InvitePage() {
  const navigate = useNavigate();
  const [newInvite, setNewInvite] = React.useState('');
  const [invites, setInvites] = React.useState([]);
  const token = localStorage.getItem('token');

  const postInvite = async () => {
    if (!newInvite.trim()) return;
    await fetch(`https://individually-wrapped.onrender.com/api/v0/invite/${newInvite}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        setNewInvite('');
        getInvites();
      })
      .catch((err) => {
        alert("Error posting invite");
        console.log(err);
      });
  };

  const getInvites = () => {
    fetch(`https://individually-wrapped.onrender.com/api/v0/invite/outbound`, {
      method: 'GET',
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
          setInvites(json);
        })
        .catch(() => {
          alert('Error getting invites');
        });
  };

  return (
    <div className="background">
      <button className="btn" onClick={() => navigate('/invitationscreate')}><i className="fa fa-arrow-left"></i></button>
      <div className="header">
        Add Roommates
      </div>
      <img src={nerdImg} className="nerdimg"/>
      <span className="memberinput">
        <input className="inputinput" placeholder="User Email" value={newInvite} onChange={(e) => setNewInvite(e.target.value)}/>
        <button className="elipses1" onClick={postInvite}><i className="fa fa-plus"></i></button>
      </span>
      <div className="invitelist">
        {invites.map((invite, index) => (
          <AddedMember
            key={index}
            email={invite.email}
            accepted={false}
          />
        ))}
      </div>
      <button className="donebutton" onClick={() => navigate('/home')}>Done</button>
    </div>
  );
}

export default InvitePage;