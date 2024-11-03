import React, { useState } from "react";
import "../style/Card.css";
import ChooseColor from "./ChooseColor";
import axios from "axios";
import DeleteCard from "./DeleteCard";

const Card = ({
  cardId,
  cardColor,
  cardText,
  allCards,
  setCards,
  setError,
}) => {
  const [colorCard, setColorCard] = useState(cardColor);
  const [text, setText] = useState(cardText);
  const [isEditing, setIsEditing] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const path = "http://localhost:5000/api/cards";

  const updateCard = (newColor = colorCard, newText = text) => {
    axios
      .put(`${path}/${cardId}`, { color: newColor, text: newText })
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error("Error updating card color:", error);
        setError(
          error.response ? error.response.data.error : "An error occurred"
        );
      });
    setColorCard(newColor);
    setText(newText);
    setShowColors(false);
    setIsEditing(false);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleColorButtonClick = () => {
    setShowColors(true); // הצג את העיגולים
  };

  return (
    <div className="card" style={{ backgroundColor: colorCard }}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          setPreviusTex
          onBlur={() => updateCard(colorCard, text)}
          autoFocus
          className="input-edit"
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{text}</span>
      )}
      {!showColors ? (
        <div className="d-flex w-100 justify-content-between mt-3">
          <button
            className="color-button d-flex"
            style={{ backgroundColor: cardColor }}
            onClick={handleColorButtonClick}
          ></button>
          <DeleteCard
            cardId={cardId}
            cards={allCards}
            setCards={setCards}
            setError={setError}
          />
        </div>
      ) : (
        <ChooseColor
          originalColors={allCards.map((card) => card.color)}
          updateCard={updateCard}
        />
      )}
    </div>
  );
};

export default Card;
