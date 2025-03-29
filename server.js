const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

// Enable CORS for frontend communication
app.use(cors());
app.use(express.json());

// Define the path to the data file
const dataPath = path.join(__dirname, 'data.json');

// Helper function to read data from data.json
const readData = () => {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write data to data.json
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET: Fetch all books
app.get('/api/books', (req, res) => {
  const books = readData();
  res.json(books);
});

// POST: Add a new book
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: Date.now(), title, author };
  const books = readData();
  books.push(newBook);
  writeData(books);
  res.status(201).json(newBook);
});

// PUT: Update a book
app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const books = readData();
  const bookIndex = books.findIndex((book) => book.id === parseInt(id));

  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books[bookIndex] = { id: parseInt(id), title, author };
  writeData(books);
  res.json(books[bookIndex]);
});

// DELETE: Remove a book
app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  let books = readData();
  books = books.filter((book) => book.id !== parseInt(id));
  writeData(books);
  res.status(204).end();
});

// Server running on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});