import React from "react";
import "../style/ChooseColor.css";

const ChooseColor = ({ updateCard }) => {
  const colors = [
    "#ffc107",
    "#28a745",
    "#6f42c1",
    "#e83e8c",
    "#dc3545",
    "#fd7e14",
  ]; // צבעים קבועים

  return (
    <div className="choose-color">
      {colors.map((color, index) => (
        <div
          key={index}
          className="color-circle"
          style={{ backgroundColor: color }}
          onClick={() => updateCard(color)} 
        ></div>
      ))}
    </div>
  );
};

export default ChooseColor;
