import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  
  // Test: Renders "Book List" header
  test('renders Book List header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Book List/i); // Checks for the "Book List" header text
    expect(headerElement).toBeInTheDocument(); // Verifies that the header is rendered
  });

  // Test: Allows adding a book
  test('allows adding a book', () => {
    render(<App />);
    
    const titleInput = screen.getByPlaceholderText(/Book Title/i); // Finds the input for the book title
    const authorInput = screen.getByPlaceholderText(/Author/i); // Finds the input for the author name
    const addButton = screen.getByText(/Add Book/i); // Finds the button with text "Add Book"

    // Simulate user entering a book title and author, and submitting the form
    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.click(addButton);

    // Check if the new book is added to the list
    const newBook = screen.getByText('Test Book by Test Author'); // Looks for the added book in the document
    expect(newBook).toBeInTheDocument(); // Verifies that the new book is visible
  });

  // Test: Allows deleting a book
  test('allows deleting a book', () => {
    render(<App />);

    // Add a book first
    const titleInput = screen.getByPlaceholderText(/Book Title/i);
    const authorInput = screen.getByPlaceholderText(/Author/i);
    const addButton = screen.getByText(/Add Book/i);
    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.click(addButton);

    // Now simulate clicking "Delete"
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    // Check that the book has been removed
    const deletedBook = screen.queryByText('Test Book by Test Author');
    expect(deletedBook).not.toBeInTheDocument(); // Verifies that the book has been deleted and is no longer in the document
  });

  // Test: Allows editing a book (using the Update Book button)
  test('allows editing a book', () => {
    render(<App />); // Render the App component

    // Add a book first
    const titleInput = screen.getByPlaceholderText(/Book Title/i);
    const authorInput = screen.getByPlaceholderText(/Author/i);
    const addButton = screen.getByText(/Add Book/i);
    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.click(addButton); // Click the "Add Book" button to add the book

    // Find the "Edit" button for the newly added book
  const editButton = screen.getByText(/Edit/i);
  fireEvent.click(editButton); // Click "Edit" to enable editing mode

  // Update the input fields
  fireEvent.change(titleInput, { target: { value: 'Updated Book' } });
  fireEvent.change(authorInput, { target: { value: 'Updated Author' } });

  // Click the "Update Book" button, this is the same as the addButton
  fireEvent.click(addButton); // The same button acts as "Update Book"

  // Verify that the updated book is displayed correctly in the list
  const updatedBook = screen.getByText('Updated Book by Updated Author');
  expect(updatedBook).toBeInTheDocument(); // Ensure the updated book appears
});

});