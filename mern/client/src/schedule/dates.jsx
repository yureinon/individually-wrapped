// display prev 2 days, today, next 2 days
import '../styles/schedule.css'

function DatePicker(props) {
  const curday = props.currentday;
  const prev1day = new Date(curday);
  prev1day.setDate(curday.getDate() - 1);
  const prev2day = new Date(curday);
  prev2day.setDate(curday.getDate() - 2);
  const next1day = new Date(curday);
  next1day.setDate(curday.getDate() + 1);
  const next2day = new Date(curday);
  next2day.setDate(curday.getDate() + 2);
  const days = [prev2day, prev1day, curday, next1day, next2day];
  const dayFormat = (day) => {
    return day.toLocaleDateString('en-US', {
      day: 'numeric'
    });
  };
  const weekdayFormat = (day) => {
    return day.toLocaleDateString('en-US', {
      weekday: 'short'
    })
  };
  return (
    <span className="datepicker">
      {days.map((day) => (
        <span key={day.toDateString()} className={day == curday ? "curday" : "spandate"}>
          <div>
            {dayFormat(day)}
          </div>
          <div>
            {weekdayFormat(day)}
          </div>
        </span>
      ))}
    </span>
  );
}

export default DatePicker;