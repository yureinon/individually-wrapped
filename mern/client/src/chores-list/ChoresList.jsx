import React from 'react'
import Chore from './Chore.jsx'
import RotateChores from './RotateChores.jsx'
import '../styles/ChoresList.css'
import nerdImg from '../assets/nerd.png'
// import AddedMember from './added';
import {useNavigate} from 'react-router-dom';

function ChoresList() {
  const navigate = useNavigate();
  return (
    <div className="background">
      <div className="yellow-curve3"></div>
      <button className="btn" onClick={() => navigate("/home")}><i className="fa fa-arrow-left"></i></button>
      <RotateChores />
      <div className="choresheader">
          Chores
        </div>
      <img src={nerdImg} className="nerdimg2"/>

      <div className="my-chores2">
          <div className = "my-chores-card2">
            <div className = "chores1">
                <Chore chore_name={"trash"} assigned={"Hayley"} completed={false}></Chore>
                <Chore chore_name={"sweep floors"} assigned={"Kaylee"} completed={true}></Chore>
                <Chore chore_name={"dishes"} assigned={"Michelle"} completed={false}></Chore>
                <Chore chore_name={"wash pc"} assigned={"Fiona"} completed={true}></Chore>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ChoresList;