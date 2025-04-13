import * as React from 'react';
import '../styles/Home.css'
import Chore from './Chore.jsx'
import Roommate from './Roommate.jsx'
// import nerdImg from '../assets/nerd.png'


function Home() {

  const [myChores, setMyChores] = React.useState([]);
  // const [roommates, setRoommates] = React.useState([]);
  // const [homeName, setHomeName] = React.useState("");
  const [curRoommateName, setCurRoommateName] = React.useState("");
  const [curRoommateStatus, setCurRoommateStatus] = React.useState("");
  const token = localStorage.getItem('token');

  const toggleChoreCompletion = async(choreName) => {
    await fetch(`http://localhost:3010/api/v0/chore`, {
      method: 'PUT',
      body: JSON.stringify({name:choreName}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .catch((error) => {
          throw(error);
        });
  };

  const getMyChores = () => {
    fetch(`http://localhost:3010/api/v0/chore`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then((json) => {
          setMyChores(json);
        })
        .catch((error) => {
          throw(error);
        });
  };

  const getMyHouse = () => {
    fetch(`http://localhost:3010/api/v0/house`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        // .then((json) => {
          // setRoommates(json.memberList);
          // setHomeName (json.name);
        // })
        .catch((error) => {
          throw(error);
        });
  };

  const getUser = () => {
    fetch(`http://localhost:3010/api/v0/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then((json) => {
          setCurRoommateName(json.name);
          setCurRoommateStatus(json.status);
        })
        .catch((error) => {
          throw(error);
        });
  };

  

  // get all my chores upon render
  React.useEffect(() => {
    getMyChores();
    getMyHouse();
  }, []);


  return (
    <div className = "home">
      <div className = "nav-bar">
        <button className="broom-button"><i className="fa-solid fa-broom"></i></button>
      </div>
      <div className = "roommates">
        <h1 className = "roommates-title">Roommates</h1>
        <div className = "roommates-card">
            <div className = "roommates-list">
                {/* <Roommate roommate_name={"Landlord"} status={"free"}></Roommate>
                <Roommate roommate_name={"Hayley"} status={"dnd"}></Roommate>
                <Roommate roommate_name={"Kaylee"} status={"away"}></Roommate>
                <Roommate roommate_name={"Michelle"} status={"asleep"}></Roommate>
                <Roommate roommate_name={"Fiona"} status={"free"}></Roommate> */}


                {/* create function to call getUser() to update state values? */}
                {/* {roommates.map((roommate, index) => (
                  <Roommate
                    key={index}
                    roommate_name={ROOMMATE_NAME}
                    status={STATUS}
                  />
                ))} */}
            </div>
        </div>
      </div>
    
      <div className = "my-chores">
        <h1 className = "my-chores-title">My Chores</h1>
        <div className = "my-chores-card">
            <div className = "chores">
                {/* <Chore chore_name={"trash"}></Chore>
                <Chore chore_name={"sweep floors"}></Chore>
                <Chore chore_name={"dishes"}></Chore>
                <Chore chore_name={"wash pc"}></Chore>
                <Chore chore_name={"play roblox"}></Chore> */}
                {myChores.map((chore, index) => (
                  <Chore
                    key={index}
                    chore_name={chore.name}
                    onClick={() => toggleChoreCompletion(chore.name)}
                  />
                ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home