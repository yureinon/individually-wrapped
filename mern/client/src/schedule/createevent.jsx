import React from 'react'

function CreateEvent() {
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You entered ${inputValue}`);
    setInputValue("");
    setPopupVisible(false);
  };
  return (
    <div>
      <button className="addeventbutton" onClick={() => setPopupVisible(true)}>
        +
      </button>
      {popupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Create Event</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Event name"
                required
              />
              <span className="eventoptionspan">
              <button className="eventoption" onClick={() => setPopupVisible(false)}>Cancel</button>
              <button className="eventoption" type="submit">Create</button>
              </span>
            </form>
            
            
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateEvent;