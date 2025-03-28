import React, { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;

    if (title && author) {
      if (editingId) {
        setBooks(books.map((book) =>
          book.id === editingId ? { id: editingId, title, author } : book
        ));
        setEditingId(null);
      } else {
        setBooks([...books, { id: Date.now(), title, author }]);
      }
    }
    e.target.reset();
  };

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleEditChange = (id, field, value) => {
    setBooks(books.map((book) =>
      book.id === id ? { ...book, [field]: value } : book
    ));
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