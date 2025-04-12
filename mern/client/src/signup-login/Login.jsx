import '../styles/Login.css'
import nerdImg from '../assets/nerd.png'
import {useNavigate} from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  return (
    <>
        <div className = "login">
            <button className="btn" onClick={() => navigate("/")}><i className="fa fa-arrow-left"></i></button>
            <img src={nerdImg} />
            <div className = "signin-card">
                <h1 className = "title">Sign In</h1>
                <input className = "email" placeholder = "Email" type="text"></input>
                <input className = "password" placeholder = "Password" type="text"></input>
                {/* needs auth */}
                <button className = "signin-button" onClick={() => navigate("/home")}>
                    SIGN IN
                </button>
            </div>
        </div>
    </>
  )
}

export default Login
