import React from 'react'
import '../styles/add-member.css'
import nerdImg from '../assets/nerd.png'
import AddedMember from './added';

function InvitePage() {
  return (
    <div className="background">
      <button className="btn"><i className="fa fa-arrow-left"></i></button>
      <div className="header">
        Add Roommates
      </div>
      <img src={nerdImg} className="nerdimg"/>
      <span className="memberinput">
        <input className="inputinput" placeholder="User Email" />
        <button className="elipses1"><i class="fa fa-plus"></i></button>
      </span>
      <div className="invitelist">
        <AddedMember email={"molly@books.com"} accepted={false}/>
        <AddedMember email={"timmy@books.com"} accepted={true} />
        <AddedMember email={"tommy@books.com"} accepted={false} />
        <AddedMember email={"terry@books.com"} accepted={true} />
        <AddedMember email={"anna@books.com"} accepted={true} />
      </div>
      <button className="donebutton">Done</button>
    </div>
  );
}

export default InvitePage;