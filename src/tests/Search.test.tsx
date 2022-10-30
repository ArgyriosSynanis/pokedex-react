import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from '../components/Search';

describe('Loading component', () => {
  it('renders the input with the correct text and icon', () => {
    render(<Search />);
    const text = screen.getByPlaceholderText(/Search Pokemon/i);
    const searchIcon = screen.getByTestId('FaSearch');
    expect(text).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
});
