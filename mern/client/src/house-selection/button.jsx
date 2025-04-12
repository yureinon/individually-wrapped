import '../styles/house-selection.css'

function Button(props) {
  return (
    <button className="housebutton1">
      {props.text}
    </button>
  );
}

export default Button
