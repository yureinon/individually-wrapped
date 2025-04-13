import '../styles/house-selection.css'
import HouseContext from '../HouseContext.jsx';
import {useNavigate} from 'react-router-dom';
import React from 'react';


function Button(props) {
  const navigate = useNavigate();
  const htx = React.useContext(HouseContext);
  const handleClick = () => {
    htx.setHouseType(props.text);
    createMyHouse();
  };
  const createMyHouse = async () => {
    const token = localStorage.getItem('token');
    await fetch(`https://individually-wrapped.onrender.com/api/v0/house`, {
      method: 'POST',
      body: JSON.stringify({type: htx.houseType, name: htx.houseName}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          navigate('/invites')
        })
        .catch((error) => {
          if (err.status === 403) {
            navigate('/login');
          }
          throw(error);
        });
  };
  return (
    <button className="housebutton1" onClick={handleClick}>
      {props.text}
    </button>
  );
}

export default Button
