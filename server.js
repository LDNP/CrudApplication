const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

// Enable CORS for frontend communication
app.use(cors({
    origin: 'http://localhost:3000', // Allow specific origin
  }));

// Define the path to the data file
const dataPath = path.join(__dirname, 'data.json');

const readData = () => {
    try {
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);  // May throw error if not valid JSON
    } catch (error) {
      console.error('Error reading data:', error);
      return [];  // Return empty array if there's an error
    }
  };
  
  const writeData = (data) => {
    try {
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing data:', error);
    }
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