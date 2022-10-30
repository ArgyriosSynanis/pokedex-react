import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../components/Loading';

describe('Loading component', () => {
  it('renders the spinner and loading text', () => {
    render(<Loading />);
    const text = screen.getByText(/Loading.../i);
    const spinner = screen.getByTestId('FaSpinner');
    expect(text).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });
});
