import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

describe('App', () => {

  test('renders Book List header', () => {
    render(<App />);
    expect(screen.getByText(/Book List/i)).toBeInTheDocument();
  });

  test('allows adding a book', () => {
    render(<App />);
    const titleInput = screen.getByPlaceholderText(/Book Title/i);
    const authorInput = screen.getByPlaceholderText(/Author/i);
    const addButton = screen.getByText(/Add Book/i);

    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Test Book by Test Author')).toBeInTheDocument();
  });

  test('allows deleting a book', () => {
    render(<App />);
    const titleInput = screen.getByPlaceholderText(/Book Title/i);
    const authorInput = screen.getByPlaceholderText(/Author/i);
    const addButton = screen.getByText(/Add Book/i);
    
    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.click(addButton);

    const bookItem = screen.getByText('Test Book by Test Author').closest('li');
    const deleteButton = within(bookItem).getByText(/Delete/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test Book by Test Author')).not.toBeInTheDocument();
  });

  test('allows editing a book', () => {
    render(<App />);
    const titleInput = screen.getByPlaceholderText(/Book Title/i);
    const authorInput = screen.getByPlaceholderText(/Author/i);
    const addButton = screen.getByText(/Add Book/i);
    
    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.click(addButton);

    const bookItem = screen.getByText('Test Book by Test Author').closest('li');
    const editButton = within(bookItem).getByText(/Edit/i);
    fireEvent.click(editButton);

    const titleField = within(bookItem).getByPlaceholderText(/Book Title/i);
    const authorField = within(bookItem).getByPlaceholderText(/Author/i);
    
    fireEvent.change(titleField, { target: { value: 'Updated Book' } });
    fireEvent.change(authorField, { target: { value: 'Updated Author' } });

    const updateButton = within(bookItem).getByText(/Update Book/i);
    fireEvent.click(updateButton);

    expect(screen.getByText('Updated Book by Updated Author')).toBeInTheDocument();
  });

});