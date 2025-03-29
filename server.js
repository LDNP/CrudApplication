const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = "./data.json";

app.use(cors());
app.use(express.json());

// Fetch books
app.get("/books", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data" });
    res.json(JSON.parse(data));
  });
});

// Add a book
app.post("/books", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data" });

    const books = JSON.parse(data);
    const newBook = { id: Date.now(), ...req.body };
    books.push(newBook);

    fs.writeFile(DATA_FILE, JSON.stringify(books, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to save data" });
      res.json(newBook);
    });
  });
});

// Delete a book
app.delete("/books/:id", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data" });

    let books = JSON.parse(data);
    books = books.filter((book) => book.id !== parseInt(req.params.id));

    fs.writeFile(DATA_FILE, JSON.stringify(books, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to save data" });
      res.json({ message: "Book deleted" });
    });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));