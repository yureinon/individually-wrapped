import React from 'react'
import '../styles/house-selection.css'
import nerdImg from '../assets/nerd.png'
import Button from './button'

function HouseSelection() {
  return (
    <div className="background">
      <div className="header">
        Where do you live?
      </div>
      <img src={nerdImg} className="nerdimg"/>
      <h4 className="campuslabel">On Campus</h4>
      <div className="buttons">
        <Button text={"Dorm"}/>
        <Button text={"Apartment"}/>
      </div>
      <h4 className="campuslabel">Off Campus</h4>
      <div className="buttons">
        <Button text={"House"}/>
        <Button text={"Apartment"}/>
      </div>
      <button className="donebutton">Done</button>
    </div>
  );
}

export default HouseSelection;