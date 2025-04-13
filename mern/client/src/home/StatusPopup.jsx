import StatusContext from "./StatusContext";
import React from "react";

function StatusPopup() {
  const ctx = React.useContext(StatusContext);
  const [showPopup, setShowPopup] = React.useState(false);
  const popupRef = React.useRef(null);
  const togglePopup = () => {
    setShowPopup(prev => !prev);
  };
  const selectOption = (option) => {
    ctx.setStatus(option);
    setShowPopup(false);
  };
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button className="pbutton" onClick={togglePopup}>Set Status</button>

      {showPopup && (
        <div
          ref={popupRef}
          style={{
            position: "absolute",
            top: "25px",
            left: "0",
            background: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
            color: "black"
          }}
        >
          {["dnd", "away", "asleep", "free"].map(option => (
            <div
              key={option}
              onClick={() => selectOption(option)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onMouseOver={(e) => e.target.style.background = "#f0f0f0"}
              onMouseOut={(e) => e.target.style.background = "#fff"}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusPopup;