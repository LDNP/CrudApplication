import React, { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Fetch books from backend when component mounts
    fetch('/api/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Error fetching books:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;

    if (title && author) {
      if (editingId) {
        // Update an existing book via PUT
        fetch(`/api/books/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, author }),
        })
          .then((response) => response.json())
          .then((updatedBook) => {
            setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
            setEditingId(null);
          });
      } else {
        // Add a new book via POST
        fetch('/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, author }),
        })
          .then((response) => response.json())
          .then((newBook) => setBooks([...books, newBook]));
      }
    }

    e.target.reset();
  };

  const handleDelete = (id) => {
    // Delete a book via DELETE
    fetch(`/api/books/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setBooks(books.filter((book) => book.id !== id));
    });
  };

  const handleEditChange = (id, field, value) => {
    setBooks(books.map((book) => (book.id === id ? { ...book, [field]: value } : book)));
  };

  return (
    <div>
      <h1>Book List</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Book Title" />
        <input name="author" placeholder="Author" />
        <button type="submit">{editingId ? 'Update Book' : 'Add Book'}</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {editingId === book.id ? (
              <>
                <input value={book.title} onChange={(e) => handleEditChange(book.id, 'title', e.target.value)} />
                <input value={book.author} onChange={(e) => handleEditChange(book.id, 'author', e.target.value)} />
                <button onClick={() => setEditingId(null)}>Save</button>
              </>
            ) : (
              <>
                {book.title} by {book.author}
                <button onClick={() => setEditingId(book.id)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;