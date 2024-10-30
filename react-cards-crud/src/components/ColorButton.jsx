import React from "react";

const ColorButton = ({ cardColor, setCardColor }) => {
  return (
    <button
      style={{ backgroundColor: cardColor }}
      onClick={() => setCardColor(cardColor)} // שינוי הצבע של הכרטיס
    ></button>
  );
};

export default ColorButton;
