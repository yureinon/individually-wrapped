import React from 'react'
import '../styles/schedule.css'
import DatePicker from './dates';
import nerdImg from '../assets/nerd.png'
import EventBlock from './event';
import CreateEvent from './createevent';
import {useNavigate} from 'react-router-dom';
import EventContext from './EventContext';
// clicking arrows on dates moves selected date to the next one / prev one, re-render dates component


function SchedulePage() {
  const navigate = useNavigate();
  const today = new Date();
  const [current, setCurrent] = React.useState(today)
  const formatted = current.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric'
  });
  const nextDay = () => {
    const newdate = new Date(current)
    newdate.setDate(current.getDate() + 1)
    setCurrent(newdate)
  }
  const prevDay = () => {
    const newdate = new Date(current)
    newdate.setDate(current.getDate() - 1)
    setCurrent(newdate)
  }
  const events = [
    {
      title: "Team Sync",
      start: "2025-04-12T09:00:00", // 9 AM
      end: "2025-04-12T10:00:00",
    },
    {
      title: "Dinner",
      start: "2025-04-12T19:30:00", // 7:30 PM
      end: "2025-04-12T20:30:00",
    },
    {
      title: "Overlap",
      start: "2025-04-12T20:00:00", // 7:30 PM
      end: "2025-04-12T20:30:00",
    },
  ];
  const START_HOUR = 0;
  const END_HOUR = 24;
  const HOUR_HEIGHT = 60;
  const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const isSameDay = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();
  const [fetchedevents, setFetchedEvents] = React.useState([]);
  React.useEffect(() => {
    getEvents();
  }, [fetchedevents]);
  const getEvents = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5050/api/v0/event`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        setFetchedEvents(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <EventContext.Provider value={{fetchedevents, setFetchedEvents}}>
      <div className="background">
        <div className="yellow-curve2"></div>
        <button className="btn" onClick={() => navigate("/home")}><i className="fa fa-arrow-left"></i></button>
        <div className="dateheader">
          {formatted}
        </div>
        <CreateEvent />
        <img src={nerdImg} className="nerdimage"/>
        <span className="displaydates">
          <button onClick={prevDay} className="prevButton">
            <i className="fa fa-arrow-left"></i>
          </button>
          <DatePicker currentday={current} />
          <button onClick={nextDay} className="nextButton">
            <i className="fa fa-arrow-right"></i>
          </button>
        </span>
        <div className="schedule-container">
          <div className="hours">
            {hours.map((hour, idx) => (
              <div key={idx} className="hour-label">
                {hour < 24 ? hour.toString().padStart(2, '0') + ":00" : "00:00"}
              </div>
            ))}
          </div>
          <div className="timeline" style={{ height: `${(END_HOUR - START_HOUR + 1) * HOUR_HEIGHT}px` }}>
            {events.map((event, index) => {
              const start = new Date(event.start);
              const end = new Date(event.end);
              const startHour = start.getHours() + start.getMinutes() / 60;
              const endHour = end.getHours() + end.getMinutes() / 60;
              const top = Math.max(0, (startHour - START_HOUR) * HOUR_HEIGHT);
              const height = (endHour - startHour) * HOUR_HEIGHT;
              const isActive = index === activeIndex;

              const overlaps = events.filter((e, i) => {
                if (i === index) return false;
                const eStart = new Date(e.start);
                const eEnd = new Date(e.end);
                return start < eEnd && end > eStart;
              });
            
              const totalColumns = overlaps.length + 1;
              const columnWidth = 180 / totalColumns;
              const left = 10 + columnWidth * overlaps.filter(e => new Date(e.start) < start).length;
            
              return isSameDay(new Date(event.start), current) ? (
                <div
                  key={index}
                  onTouchStart={() => setActiveIndex(index)}
                  className="eventbubble"
                  style={{
                    top: `${top + 30}px`,
                    height: `${height}px`,
                    width: `${columnWidth}px`,
                    left: `${left}px`,
                    zIndex: isActive ? 10 : 1}}
                >
                    <EventBlock name={event.title} start={event.start} end={event.end} />
                </div>
            ) : null;
            })}
          </div>
        </div>
      </div>
    </EventContext.Provider>
  );
}

export default SchedulePage;