import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Book List App', () => {
  test('renders book list app', () => {
    render(<App />);
    
    // Check if main elements are present
    expect(screen.getByText('Book List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Book Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Author')).toBeInTheDocument();
    expect(screen.getByText('Add Book')).toBeInTheDocument();
  });
});