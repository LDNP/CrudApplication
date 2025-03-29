import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/books";

function App() {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setBooks)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;

    if (!title || !author) return;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });

    const data = await response.json();
    setBooks([...books, data]);
    e.target.reset();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div>
      <h1>Book List</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Book Title" required />
        <input name="author" placeholder="Author" required />
        <button type="submit">Add Book</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;