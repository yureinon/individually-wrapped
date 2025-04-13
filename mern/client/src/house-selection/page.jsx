import React from 'react'
import '../styles/house-selection.css'
import nerdImg from '../assets/nerd.png'
import Button from './button'
import { useNavigate } from 'react-router-dom'

function HouseSelection() {
  const navigate = useNavigate();
  return (
    <div className="background1">
      <button className="btn" onClick={() => navigate("/invitationscreate")}><i className="fa fa-arrow-left"></i></button>
      <div className="header1">
        Where do you live?
      </div>
      <img src={nerdImg} className="nerdimg1"/>
      <h4 className="campuslabel1">On Campus</h4>
      <div className="buttons1">
        <Button text={"Dorm"}/>
        <Button text={"Apartment"}/>
      </div>
      <h4 className="campuslabel1">Off Campus</h4>
      <div className="buttons1">
        <Button text={"House"}/>
        <Button text={"Apartment"}/>
      </div>
    </div>
  );
}

export default HouseSelection;