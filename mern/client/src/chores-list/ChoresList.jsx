import React from 'react'
import Chore from './Chore.jsx'
import RotateChores from './RotateChores.jsx'
import '../styles/ChoresList.css'
import nerdImg from '../assets/nerd.png'
// import AddedMember from './added';
import {useNavigate} from 'react-router-dom';

function ChoresList() {
  const navigate = useNavigate();
    const [myChores, setMyChores] = React.useState([]);
    const [roommates, setRoommates] = React.useState([]);
    const [choresByRoommate, setChoresByRoommate] = React.useState({});

  const getMyChores = (email) => {
    const token = localStorage.getItem('token');

    fetch(`https://individually-wrapped.onrender.com/api/v0/chore/${email}`, {
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
        })
        .catch((error) => {
          if (error.status === 404) {
            navigate('/invitationscreate')
          }
          throw(error);
        });
  };


  React.useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchChoresForAll = async () => {
      const results = {};

      await Promise.all(
        roommates.map(async (email) => {
          try {
            const res = await fetch(`https://individually-wrapped.onrender.com/api/v0/chore/${email}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });

            if (!res.ok) throw res;
            const chores = await res.json();
            results[email] = chores;
          } catch (err) {
            console.error(`Error fetching chores for ${email}:`, err);
            results[email] = [];
          }
        })
      );

      setChoresByRoommate(results);
    };

    if (roommates && roommates.length > 0) {
      fetchChoresForAll();
    }
  }, [roommates]);

  React.useEffect(() => {
    getMyHouse();
  }, []);

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
            <div className="chores1">
            {Object.entries(choresByRoommate).map(([user, chores]) => (
              <div key={user}>
                <h3>{chores[0]?.user}</h3>
                {chores.length > 0 ? (
                  chores.map((chore, idx) => (
                    <Chore
                      key={idx}
                      chore_name={chore.name}
                      completed={chore.completed}
                      assigned={null}
                    />
                  ))
                ) : (
                  null // optional fallback text
                )}
              </div>
            ))}

            </div>
          </div>
        </div>
      </div>
  );
}

export default ChoresList;