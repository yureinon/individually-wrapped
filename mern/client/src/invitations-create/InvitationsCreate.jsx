import '../styles/InvitationsCreate.css'
import nerdImg from '../assets/nerd.png'
import Invitation from './Invitations.jsx'
import {useNavigate} from 'react-router-dom';
import CreateHouse from './CreateHouse.jsx';


function InvitationsCreate() {

  const navigate = useNavigate();

  return (
    <>
        <div className = "invitations-create">
            <button className="btn" onClick={() => navigate("/")}><i className="fa fa-arrow-left"></i></button>
            <img src={nerdImg} />
            <CreateHouse />
            <div className = "invitations">
                <h1 className = "invitations-title">Invitations</h1>
                <div className = "invitations-list">
                    <Invitation sender={"Jane Doe"}></Invitation>
                    <Invitation sender={"Jane Doe"}></Invitation>
                    <Invitation sender={"Jane Doe"}></Invitation>
                    <Invitation sender={"Jane Doe"}></Invitation>
                    <Invitation sender={"Jane Doe"}></Invitation>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default InvitationsCreate
