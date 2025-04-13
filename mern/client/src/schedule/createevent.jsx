import React from 'react'
import EventContext from './EventContext';
import {useNavigate} from 'react-router-dom';

function CreateEvent() {
  const navigate = useNavigate();
  const ectx = React.useContext(EventContext);
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [day, setDay] = React.useState("");
  const [starttime, setStarttime] = React.useState("");
  const [endtime, setEndtime] = React.useState("");
  const [event, setEvent] = React.useState({name: "", start: "", end: ""});
  const handleSubmit = (e) => {
    e.preventDefault();
    generateEventTimes(day, starttime, endtime);
    console.log(event);
    sendEvent();
    setInputValue("");
    setStarttime("");
    setEndtime("");
    setDay("");
    setPopupVisible(false);
  };

  const sendEvent = async () => {
    const token = localStorage.getItem('token');
    await fetch(`https://individually-wrapped.onrender.com/api/v0/event`, {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        // ectx.setFetchedEvents((prev) => [...prev, event]);
      })
      .catch((err) => {
        if (err.status === 403) {
          navigate('/login');
        }
        console.log(err);
      })
  };
  const generateEventTimes = (dd, st, et) => {
    const actualstart = parseDate(dd, st).toISOString();
    const actualend = parseDate(dd, et).toISOString();
    setEvent({name: inputValue, start: actualstart, end: actualend});
  }
  function parseDate(dateStr, timeStr) {
    const [month, day, year] = dateStr.split("/");
    const date = new Date(`${year}-${month}-${day}T${convertTo24Hour(timeStr)}`);
    return date;
  }
  function convertTo24Hour(timeStr) {
    const [_, h, m, p] = timeStr.match(/(\d+):(\d+)(AM|PM)/i);
    let hour = parseInt(h, 10);
    if (p.toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (p.toUpperCase() === "AM" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, "0")}:${m}`;
  }
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
              <input
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="MM/DD/YYYY"
                required
              />
              <input
                type="text"
                value={starttime}
                onChange={(e) => setStarttime(e.target.value)}
                placeholder="Start time (ex: 9:00AM)"
                required
              />
              <input
                type="text"
                value={endtime}
                onChange={(e) => setEndtime(e.target.value)}
                placeholder="End time (ex: 10:00PM)"
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