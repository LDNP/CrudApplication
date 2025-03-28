import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Book List App', () => {
  test('renders book list app', () => {
    render(<App />);
    
    // Check if main elements are present
    expect(screen.getByText('Book List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Book Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Author')).toBeInTheDocument();
  });

  test('adds a new book', () => {
    render(<App />);
    
    // Find input fields and add button
    const titleInput = screen.getByPlaceholderText('Book Title');
    const authorInput = screen.getByPlaceholderText('Author');
    const addButton = screen.getByText('Add Book');

    // Enter book details
    fireEvent.change(titleInput, { target: { value: 'React Basics' } });
    fireEvent.change(authorInput, { target: { value: 'John Doe' } });
    
    // Click add button
    fireEvent.click(addButton);

    // Check if book appears in the list
    expect(screen.getByText('React Basics by John Doe')).toBeInTheDocument();
  });

  test('deletes a book', () => {
    render(<App />);
    
    // Add a book first
    const titleInput = screen.getByPlaceholderText('Book Title');
    const authorInput = screen.getByPlaceholderText('Author');
    const addButton = screen.getByText('Add Book');

    fireEvent.change(titleInput, { target: { value: 'Book to Delete' } });
    fireEvent.change(authorInput, { target: { value: 'Delete Author' } });
    fireEvent.click(addButton);

    // Find and click delete button
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Verify book is removed
    expect(screen.queryByText('Book to Delete by Delete Author')).toBeNull();
  });

  test('edits a book', () => {
    render(<App />);
    
    // Add a book
    const titleInput = screen.getByPlaceholderText('Book Title');
    const authorInput = screen.getByPlaceholderText('Author');
    const addButton = screen.getByText('Add Book');

    fireEvent.change(titleInput, { target: { value: 'Original Book' } });
    fireEvent.change(authorInput, { target: { value: 'Original Author' } });
    fireEvent.click(addButton);

    // Start editing
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    // Change book details
    const editTitleInput = screen.getByDisplayValue('Original Book');
    const editAuthorInput = screen.getByDisplayValue('Original Author');

    fireEvent.change(editTitleInput, { target: { value: 'Updated Book' } });
    fireEvent.change(editAuthorInput, { target: { value: 'Updated Author' } });

    // Save the changes
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Verify updated book
    expect(screen.getByText('Updated Book by Updated Author')).toBeInTheDocument();
  });
});
