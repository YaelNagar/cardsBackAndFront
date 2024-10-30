const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

//cards LIST
let cards = [
  {
    id: 0,
    text: "card 1",
    color: "#ffc107",
  },
  {
    id: 1,
    text: "card 2",
    color: "#28a745",
  },
  {
    id: 2,
    text: "card 3",
    color: "#6f42c1",
  },
  {
    id: 3,
    text: "card 4",
    color: "#e83e8c",
  },
  {
    id: 4,
    text: "card 5",
    color: "#dc3545",
  },
  {
    id: 5,
    text: "card 6",
    color: "#fd7e14",
  },
];

app.get("/api/cards", (req, res) => {
  res.json(cards);
});

app.get("/api/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find((b) => b.id === cardId);
  res.json(card);
});

//update
app.put("/api/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const { text, color } = req.body;
  const cardIndex = cards.findIndex((card) => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).json({ error: "card not found" });
  }
  cards[cardIndex] = { ...cards[cardIndex], text, color };
  res.json(cards);
});

//adding
app.post("/api/cards", (req, res) => {
  const { text, color } = req.body;
  if (!text || !color) {
    return res.status(400).send("Missing required fields: text and color.");
  }
  const newcard = { id: Date.now(), text, color };
  cards.push(newcard);
  res.status(201).json(cards);
});

app.delete("/api/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  cards = cards.filter((x) => x.id != cardId);
  res.status(204).json();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
