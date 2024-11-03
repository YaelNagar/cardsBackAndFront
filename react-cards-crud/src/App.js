import "./App.css";
import Card from "../src/components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style/Card.css";
import { IoIosAdd } from "react-icons/io";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

function App() {
  const [allCards, setCards] = useState([]);
  const [error, setError] = useState("");
  const path = "http://localhost:5000/api/cards";
  const rows = [];
  const numberOfRows = Math.ceil(allCards.length / 4); // נניח שיש 4 כרטיסים בכל שורה

  //יצירת שורות כדי לאפשר גרירה בין שורות ועמודות
  for (let i = 0; i < numberOfRows; i++) {
    rows.push(allCards.slice(i * 4, i * 4 + 4)); // לחלק את הכרטיסים לשורות
  }

  useEffect(() => {
    axios
      .get(`${path}`)
      .then((response) => {
        setCards(response.data);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(
          error.response ? error.response.data.error : "An error occurred"
        );
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
        setCards([...allCards, response.data]);
      })
      .catch((error) => {
        console.error("Error adding new card:", error);
        setError(
          error.response ? error.response.data.error : "An error occurred"
        );
      });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(allCards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    axios
      .put(`${path}/edit/updateOrder`, { cards: items })
      .then((response) => {
        console.log("Order updated successfully:", response.data);
        setCards(items);
      })
      .catch((error) => {
        console.error(
          "Error updating order:",
          error.response ? error.response.data : error
        );
      });
  };

  return (
    <div className="App" style={{ height: "100vh" }}>
      <div className="card-container justify-content-center">
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {rows.map((row, rowIndex) => (
            <Droppable
              className="droppable"
              droppableId={`droppable-${rowIndex}`}
              direction="horizontal"
              key={rowIndex}
            >
              {(provided) => (
                <div
                  className="card-row"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "16px",
                  }}
                >
                  {row.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={String(card.id)}
                      index={index + rowIndex * 4}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            cardId={card.id}
                            cardColor={card.color}
                            cardText={card.text}
                            allCards={allCards}
                            setCards={setCards}
                            setError={setError}
                            index={index + rowIndex * 4}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      <IoIosAdd className="addIcon" onClick={addCard} />
    </div>
  );
}

export default App;