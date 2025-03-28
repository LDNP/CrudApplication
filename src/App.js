import React, { useState, useEffect } from 'react';

function App() {
  // Initialize state from local storage
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  // State for managing form inputs (title and author of the book)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Effect to update local storage whenever books change
  useEffect(() => {
    // Save books to local storage
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  // State for tracking which book is being edited (if any)
  const [editingId, setEditingId] = useState(null);

  // Handle form submission (for adding or updating a book)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Check if title and author are provided
    if (title && author) {
      if (editingId) {
        // Update existing book if editingId is set
        setBooks(books.map((book) =>
          book.id === editingId ? { id: editingId, title, author } : book // If the book ID matches editingId, update it with the new data
        ));
        setEditingId(null); // Reset editing state after update
      } else {
        // Add a new book if no editingId (fresh book)
        setBooks([...books, { id: Date.now(), title, author }]); // Use Date.now() as unique ID for the book
      }

      // Clear the input fields after submission
      setTitle('');
      setAuthor('');
    }
  };

  // Delete a book from the list
  const handleDelete = (id) => {
    // Filter out the book with the specified id from the books array
    setBooks(books.filter((book) => book.id !== id));
  };

  // Edit a book's details
  const handleEdit = (id) => {
    // Find the book by id
    const book = books.find((book) => book.id === id);

    // Set the form fields with the current book data
    setTitle(book.title);
    setAuthor(book.author);

    // Set editingId to the book's id, indicating we are editing this book
    setEditingId(id);
  };

  return (
    <div>
      <h1>Book List</h1>

      {/* Form for adding or editing books */}
      <form onSubmit={handleSubmit}>
        {/* Input field for book title */}
        <input
          type="text"
          placeholder="Book Title"
          value={title} // Bind input value to the state
          onChange={(e) => setTitle(e.target.value)} // Update state on input change
        />

        {/* Input field for book author */}
        <input
          type="text"
          placeholder="Author"
          value={author} // Bind input value to the state
          onChange={(e) => setAuthor(e.target.value)} // Update state on input change
        />

        {/* Button to submit the form */}
        <button type="submit">
          {editingId ? 'Update Book' : 'Add Book'} {/* Dynamically change button text based on editing state */}
        </button>
      </form>

      {/* Render the list of books */}
      <ul>
        {books.map((book) => (
          <li key={book.id}> {/* Each list item needs a unique key for efficient rendering */}
            {book.title} by {book.author} {/* Display book title and author */}

            {/* Edit button to modify book */}
            <button onClick={() => handleEdit(book.id)}>Edit</button>

            {/* Delete button to remove the book */}
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;