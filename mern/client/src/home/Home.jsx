import '../styles/Home.css'
import Chore from './Chore.jsx'
import Roommate from './Roommate.jsx'
// import nerdImg from '../assets/nerd.png'


function Home() {

  return (
    <div className = "home">
      <div className = "nav-bar">
        <button className="broom-button"><i className="fa-solid fa-broom"></i></button>
      </div>
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