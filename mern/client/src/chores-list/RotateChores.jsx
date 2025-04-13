import React from 'react';
import EventContext from './EventContext';

function RotateChores() {
  const ectx = React.useContext(EventContext);
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState("");
  const [selectedChore, setSelectedChore] = React.useState("");

  const [roommateEmails, setRoommateEmails] = React.useState([]);
  const [roommateNames, setRoommateNames] = React.useState([]);
//   const [choreOptions, setChoreOptions] = React.useState([]);
//   const eventOptions = ["rotation-1", "rotation-2", "kitchen-week", "bathroom-duty"];
  const choreOptions = ["trash", "dishes", "vacuum", "mop"];

  const getRoommateEmails = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5050/api/v0/house`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .then((json) => {
            setRoommateEmails(json.members);
          })
          .catch((error) => {
            if (error.status === 404) {
                console.log("404 found");
            //   navigate('/invitationscreate')
            }
            throw(error);
          });
    };


  React.useEffect(() => {
    const fetchRoommatesAndNames = async () => {
      try {
        await getRoommateEmails(); // This updates roommateEmails
  
        // Now fetch all names
        const token = localStorage.getItem('token');
        const namePromises = roommateEmails.map(email =>
          fetch(`http://localhost:5050/api/v0/user?email=${email}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }).then(res => {
            if (!res.ok) throw res;
            return res.json();
          }).then(json => json.name)
        );
  
        const names = await Promise.all(namePromises);
        setRoommateNames(names);
      } catch (err) {
        console.error("Error fetching roommate names:", err);
      }
    };
  
    fetchRoommatesAndNames();
  }, [roommateEmails.length]); // Re-run only if the number of emails changes
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    const event = {
      name: selectedEvent,
      chore: selectedChore,
      timestamp: new Date().toISOString()
    };

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5050/api/v0/event`, {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) throw res;

      ectx.setFetchedEvents(prev => [...prev, event]);
      setPopupVisible(false);
      setSelectedEvent("");
      setSelectedChore("");
    } catch (err) {
      console.log("Error sending event:", err);
    }
  };

  return (
    <div>
      <button className="rotate-button" onClick={() => setPopupVisible(true)}>
        <i className="fa-solid fa-rotate"></i>
      </button>

      {popupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="rotatechores-title">Rotate Chores</h3>
            <h5 className="rotatechores-instructions">Select a roommate and chore to start rotation.</h5>
            <form onSubmit={handleSubmit}>
              <label>Roommate Name</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                required
              >
                <option value="">Select Event</option>
                {roommateNames.map(event => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>

              <label>Chore</label>
              <select
                value={selectedChore}
                onChange={(e) => setSelectedChore(e.target.value)}
                required
              >
                <option value="">Select Chore</option>
                {choreOptions.map(chore => (
                  <option key={chore} value={chore}>{chore}</option>
                ))}
              </select>

              <span className="eventoptionspan">
                <button
                  className="eventoption"
                  type="button"
                  onClick={() => setPopupVisible(false)}
                >
                  Cancel
                </button>
                <button className="eventoption" type="submit">Create</button>
              </span>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RotateChores;
