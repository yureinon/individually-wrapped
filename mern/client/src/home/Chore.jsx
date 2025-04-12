function Chore(props) {
  return (
    <label className="chore">
      <input
        type="checkbox"
        className="checkbox"
        name={props.chore_name}
        value={props.chore_name}
      />
      <span className="chore-name">{props.chore_name}</span>
    </label>
  );
}

export default Chore;
