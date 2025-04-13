import '../styles/Login.css'
import nerdImg from '../assets/nerd.png'
import {useNavigate} from 'react-router-dom';
import React from 'react';
import UserContext from '../UserContext';

function Login() {
  const utx = React.useContext(UserContext);
  const [credentials, setCredentials] =
      React.useState({email: '', password: ''});
  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const getMyHouse = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5050/api/v0/house`, {
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
          navigate('/home');
        })
        .catch((error) => {
          if (error.status === 404) {
            navigate('/invitationscreate');
          }
          throw(error);
        });
  };
  const login = async () => {
    localStorage.removeItem('token');
    await fetch(`http://localhost:5050/api/v0/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('token', json.accessToken);
        utx.setUserName(json.name);
        utx.setUserEmail(json.email);
        getMyHouse();
      })
      .catch((err) => {
        alert("Error logging in");
        console.log(err);
      });
  };

  const navigate = useNavigate();
  return (
    <>
        <div className = "login">
            <button className="btn" onClick={() => navigate("/")}><i className="fa fa-arrow-left"></i></button>
            <img src={nerdImg} />
            <div className = "signin-card">
                <h1 className = "title">Sign In</h1>
                <input name="email" className = "email" placeholder = "Email" type="text" onChange={handleInputChange}></input>
                <input name="password" className = "password" placeholder = "Password" type="text" onChange={handleInputChange}></input>
                {/* needs auth */}
                <button className = "signin-button" onClick={login}>
                    SIGN IN
                </button>
            </div>
        </div>
    </>
  )
}

export default Login
