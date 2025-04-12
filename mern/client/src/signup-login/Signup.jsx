// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '../styles/Signup.css'
import nerdImg from '../assets/nerd.png'

function Signup() {
//   const [count, setCount] = useState(0)

  return (
    <>
        <div className = "signup">
            <button className="btn"><i className="fa fa-arrow-left"></i></button>
            <img src={nerdImg} />
            <div className = "signin-card">
                <h1 className = "title">Sign Up</h1>
                <input className = "email" placeholder = "Email" type="text"></input>
                <input className = "name" placeholder = "Name" type="text"></input>
                <input className = "password" placeholder = "Password" type="text"></input>
                <button className = "signup-button">
                    SIGN UP
                </button>
            </div>
        </div>
    </>
  )
}

export default Signup
