import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound component', () => {
  it('renders not found if page does not exist', () => {
    render(<NotFound />);
    const text = screen.getByText(/Page not found/i);
    expect(text).toBeInTheDocument();
  });
});
