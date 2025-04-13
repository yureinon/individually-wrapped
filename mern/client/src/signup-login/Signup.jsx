import '../styles/Signup.css'
import nerdImg from '../assets/nerd.png'
import {useNavigate} from 'react-router-dom';
import React from 'react';

function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] =
    React.useState({email: '', password: '', name: ''});
  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const signup = async (event) => {
    localStorage.removeItem('token');
    console.log(credentials);
    await fetch(`https://individually-wrapped.onrender.com/api/v0/user`, {
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
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className = "signup">
          <button className="btn" onClick={() => navigate("/")}><i className="fa fa-arrow-left"></i></button>
          <img src={nerdImg} />
          <div className = "signin-card">
              <h1 className = "title">Sign Up</h1>
              <input className = "email" name="email" placeholder = "Email" type="text" onChange={handleInputChange}></input>
              <input className = "name" name="name" placeholder = "Name" type="text" onChange={handleInputChange}></input>
              <input className = "password" name="password" placeholder = "Password" type="text" onChange={handleInputChange}></input>
              <button className = "signup-button" onClick={signup}>
                  SIGN UP
              </button>
          </div>
      </div>
    </>
  )
}

export default Signup
