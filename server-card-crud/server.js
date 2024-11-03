const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

//cards LIST
let cards = [
  { id: 0, text: "card 1", color: "#ffc107" },
  { id: 1, text: "card 2", color: "#28a745" },
  { id: 2, text: "card 3", color: "#6f42c1" },
  { id: 3, text: "card 4", color: "#e83e8c" },
  { id: 4, text: "card 5", color: "#dc3545" },
  { id: 5, text: "card 6", color: "#fd7e14" },
];

const isValidColor = (color) => /^#([0-9A-F]{3}){1,2}$/i.test(color);
const isValidText = (text) =>
  typeof text === "string" && text.trim().length > 0;

app.get("/api/cards", (req, res) => {
  cards.length > 0
    ? res.json(cards)
    : res.status(404).json({ error: "No cards available" });
});

app.get("/api/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  if (isNaN(cardId)) return res.status(400).json({ error: "Invalid card ID" });

  const card = cards.find((b) => b.id === cardId);
  card ? res.json(card) : res.status(404).json({ error: "Card not found" });
});

// Update card
app.put("/api/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const { text, color } = req.body;
  if (isNaN(cardId)) return res.status(400).json({ error: "Invalid card ID" });
  if (!isValidText(text) || !isValidColor(color)) {
    return res.status(400).json({
      error:
        "Invalid input: 'text' should be non-empty and 'color' should be a valid hex code",
    });
  }

  const cardIndex = cards.findIndex((card) => card.id === cardId);
  if (cardIndex === -1)
    return res.status(404).json({ error: "Card not found" });

  cards[cardIndex] = { ...cards[cardIndex], text, color };
  res.json(cards);
});

// Update order of cards
app.put("/api/cards/edit/updateOrder", (req, res) => {
  try {
    const updatedCards = req.body.cards;
    // עדכון המערך הקיים של הכרטיסים
    cards = updatedCards.map((card) => {
      const existingCard = cards.find((c) => c.id === card.id);
      return existingCard ? { ...existingCard, ...card } : card;
    });

    res.json(cards);
  } catch (error) {
    console.error(error.message);
  }
});

// Add new card
app.post("/api/cards", (req, res) => {
  const { text, color } = req.body;
  if (!isValidText(text) || !isValidColor(color)) {
    return res.status(400).json({
      error:
        "Invalid input: 'text' should be non-empty and 'color' should be a valid hex code",
    });
  }

  const newCard = { id: Date.now(), text, color };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// Delete card
app.delete("/api/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  if (isNaN(cardId)) return res.status(400).json({ error: "Invalid card ID" });

  const initialLength = cards.length;
  cards = cards.filter((x) => x.id !== cardId);

  if (cards.length === initialLength) {
    return res.status(404).json({ error: "Card not found" });
  }

  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
