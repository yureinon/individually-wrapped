// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '../styles/Landing.css'
import nerdImg from '../assets/nerd.png'

function Landing() {
//   const [count, setCount] = useState(0)

  return (
    <div className = "landing">
      <div className = "title">
        <div className = "welcome">Welcome to</div>
        <div className = "app-name">slug</div>
      </div>
      <img src={nerdImg} />
      <div className = "buttons">
        <button className = "signin">
            SIGN IN
        </button>
        <button className= "signin">
            SIGN UP
        </button>
      </div>
    </div>
  )
}

export default Landing
