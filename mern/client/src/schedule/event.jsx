
function EventBlock (props) {
  const start = new Date(props.start);
  const end = new Date(props.end);
  return (
    <div>
      <div>
        {props.name}
      </div>
      <div>
        {start.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}
        -
        {end.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}
      </div>
    </div>
  );
}

export default EventBlock;