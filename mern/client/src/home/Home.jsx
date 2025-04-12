import '../styles/Home.css'
import Chore from './Chore.jsx'
import Roommate from './Roommate.jsx'
import {useNavigate} from 'react-router-dom';
// import nerdImg from '../assets/nerd.png'


function Home() {
  const navigate = useNavigate();

  return (
    <div className = "home">
      <div className="yellow-curve1"></div>
      <div className = "nav-bar">
        <button className="broom-button" onClick={() => navigate("/schedule")}><i className="fa-solid fa-broom"></i></button>
      </div>
      <h1 className="home-name">Temporary Name</h1>
      <div className = "roommates">
        <h1 className = "roommates-title">Roommates</h1>
        <div className = "roommates-card">
            <div className = "roommates-list">
                <Roommate roommate_name={"Landlord"} status={"free"}></Roommate>
                <Roommate roommate_name={"Hayley"} status={"dnd"}></Roommate>
                <Roommate roommate_name={"Kaylee"} status={"away"}></Roommate>
                <Roommate roommate_name={"Michelle"} status={"asleep"}></Roommate>
                <Roommate roommate_name={"Fiona"} status={"free"}></Roommate>
            </div>
        </div>
      </div>
    
      <div className = "my-chores">
        <h1 className = "my-chores-title">My Chores</h1>
        <div className = "my-chores-card">
            <div className = "chores">
                <Chore chore_name={"trash"}></Chore>
                <Chore chore_name={"sweep floors"}></Chore>
                <Chore chore_name={"dishes"}></Chore>
                <Chore chore_name={"wash pc"}></Chore>
                <Chore chore_name={"play roblox"}></Chore>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home