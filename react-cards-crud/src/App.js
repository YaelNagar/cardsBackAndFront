import "./App.css";
import Card from "../src/components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style/Card.css";
import { IoIosAdd } from "react-icons/io";

function App() {
  const [allCards, setCards] = useState([]);
  const path = "http://localhost:5000/api/cards";

  useEffect(() => {
    axios
      .get(`${path}`)
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [allCards]);

  const addCard = () => {
    const newCard = {
      color: "#FFFFFF",
      text: "New card",
    };

    axios
      .post(`${path}`, newCard)
      .then((response) => {
        setCards([...allCards, response.data]); // הוספת הכרטיס החדש למערך
      })
      .catch((error) => {
        console.error("Error adding new card:", error);
      });
  };

  return (
    <div className="App">
      <div className="card-container justify-content-center d-flex">
        {allCards.map((card) => (
          <Card
            key={card.id}
            cardId={card.id}
            cardColor={card.color}
            cardText={card.text}
            allCards={allCards}
            setCards={setCards}
          />
        ))}
      </div>
      <IoIosAdd className="addIcon" onClick={addCard} />
    </div>
  );
}

export default App;