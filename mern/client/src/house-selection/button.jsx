import '../styles/house-selection.css'

function Button(props) {
  return (
    <button className="housebutton">
      {props.text}
    </button>
  );
}

export default Button
