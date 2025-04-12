import '../styles/Landing.css'
import nerdImg from '../assets/nerd.png'
import {useNavigate} from 'react-router-dom';

function Landing() {
//   const [count, setCount] = useState(0)

  const navigate = useNavigate();
  return (
    <div className = "landing">
      <div className = "landing-title">
        <div className = "welcome">Welcome to</div>
        <div className = "app-name">slug</div>
      </div>
      <img src={nerdImg} />
      <div className = "buttons">
        <button className = "signin" onClick={() => navigate("/login")}>
            SIGN IN
        </button>
        <button className= "signin" onClick={() => navigate("/signup")}>
            SIGN UP
        </button>
      </div>
    </div>
  )
}

export default Landing
