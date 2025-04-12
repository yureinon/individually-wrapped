// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '../styles/Login.css'
import nerdImg from '../assets/nerd.png'

function Login() {
//   const [count, setCount] = useState(0)

  return (
    <>
        <div className = "login">
            <button className="btn"><i className="fa fa-arrow-left"></i></button>
            <img src={nerdImg} />
            <div className = "signin-card">
                <h1 className = "title">Sign In</h1>
                <input className = "email" placeholder = "Email" type="text"></input>
                <input className = "password" placeholder = "Password" type="text"></input>
                <button className = "signin-button">
                    SIGN IN
                </button>
            </div>
        </div>
    </>
  )
}

export default Login
