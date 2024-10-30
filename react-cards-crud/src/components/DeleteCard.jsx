import React from "react";
import "../style/DelelteCard.css";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";

const DeleteCard = ({ cardId, cards, setCards }) => {
  const path = "http://localhost:5000/api/cards";

  const deleteCard = async (id) => {
    axios
      .delete(`${path}/${id}`)
      .then(() => {
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  };

  return (
    <RiDeleteBinLine
      className="deleteIcon"
      onClick={() => deleteCard(cardId)}
    />
  );
};

export default DeleteCard;
