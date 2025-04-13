import '../styles/Home.css'
import Chore from './Chore.jsx'
import Roommate from './Roommate.jsx'
import {useNavigate} from 'react-router-dom';
// import nerdImg from '../assets/nerd.png'
import React from 'react';
import UserContext from '../UserContext.jsx';
import StatusContext from './StatusContext.jsx';
import StatusPopup from './StatusPopup.jsx';


function Home() {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState("free");
  const ctx = React.useContext(UserContext);
  const [myChores, setMyChores] = React.useState([]);
  const [roommates, setRoommates] = React.useState([]);
  const [homeName, setHomeName] = React.useState("");
  const [roommateData, setRoommateData] = React.useState([]);

  const toggleChoreCompletion = async(choreName) => {
    const token = localStorage.getItem('token');

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
          if (err.status === 403) {
            navigate('/login');
          }
          throw(error);
        });
  };

  const getMyChores = () => {
    const token = localStorage.getItem('token');

    fetch(`https://individually-wrapped.onrender.com/api/v0/chore/${ctx.currentUserEmail}`, {
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
          if (error.status === 403) {
            navigate('/login');
          }
          throw(error);
        });
  };

  const getMyHouse = async () => {
    const token = localStorage.getItem('token');

    await fetch(`https://individually-wrapped.onrender.com/api/v0/house`, {
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
          setRoommates(json.members);
          // setRoommates(json.memberList);
          setHomeName(json.name);
        })
        .catch((error) => {
          if (error.status === 404) {
            navigate('/invitationscreate')
          }
          if (error.status === 403) {
            navigate('/login');
          }
          throw(error);
        });
  };

  const getUser = async (email) => {
    const token = localStorage.getItem('token');

    return await fetch(`https://individually-wrapped.onrender.com/api/v0/user?email=${email}`, {
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
          return {name: json.name, status: json.status};
        })
        .catch((error) => {
          if (err.status === 403) {
            navigate('/login');
          }
          throw(error);
        });
  };

  const fetchRoommates = async () => {
      const filteredEmails = roommates.filter(email => email !== ctx.currentUserEmail);
      const newRoommateData = [];
      for (const email of filteredEmails) {
        try {
          const data = await getUser(email); // fetch one at a time
          newRoommateData.push(data);
        } catch (err) {
          console.error(`Failed to fetch data for ${email}:`, err);
        }
      }
      setRoommateData(newRoommateData);
  };

  // get all my chores upon render
  React.useEffect(() => {
    getMyChores();
    getMyHouse();
  }, []);

  React.useEffect(() => {
    fetchRoommates();
  }, [roommates]);


  return (
    <StatusContext.Provider value={{status, setStatus}}>
    <div className = "home">
    <div className="yellow-curve1"></div>
      <div className = "nav-bar">
        <button className="broom-button" onClick={() => navigate("/choreslist")}><i className="fa-solid fa-broom"></i></button>
        <button className="calendar-button" onClick={() => navigate("/schedule")}><i className="fa-solid fa-calendar"></i></button>
      </div>
      <h1 className="home-name">{homeName}</h1>
      <div className = "roommates">
        <span className="popuproom"><h1 className = "roommates-title">Roommates</h1><StatusPopup /></span>
        <div className = "roommates-card">
            <div className = "roommates-list">
                <Roommate roommate_name={ctx.currentUserName} status={status} />

                {/* <Roommate roommate_name={"Landlord"} status={"free"}></Roommate>
                <Roommate roommate_name={"Hayley"} status={"dnd"}></Roommate>
                <Roommate roommate_name={"Kaylee"} status={"away"}></Roommate>
                <Roommate roommate_name={"Michelle"} status={"asleep"}></Roommate>
                <Roommate roommate_name={"Fiona"} status={"free"}></Roommate> */}


                {/* create function to call getUser() to update state values? */}
                {roommateData.map((roommate, index) => roommate ? (
                  <Roommate
                    key={index}
                    roommate_name={roommate.name}
                    status={roommate.status}
                  />
                ) : null)}
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

    </StatusContext.Provider>
  )
}

export default Home