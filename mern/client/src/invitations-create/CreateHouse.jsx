import React from 'react';
import '../styles/InvitationsCreate.css'
import {useNavigate} from 'react-router-dom';

function CreateHouse() {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue("");
    setPopupVisible(false);
    navigate("/houseselection")
  };
  return (
    <div className="invitations-create">
      <button className = "create-button" onClick={() => setPopupVisible(true)}>
        Create
      </button>
      {popupVisible && (
        <div className="popup-overlay2">
          <div className="popup-content2">
            <h3>Create House</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="House name"
                required
              />
              <span className="eventoptionspan2">
              <button className="eventoption2" onClick={() => setPopupVisible(false)}>Cancel</button>
              <button className="eventoption2" type="submit">Create</button>
              </span>
            </form>
            
            
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateHouse;