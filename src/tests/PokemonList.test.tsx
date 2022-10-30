import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PokemonList from '../components/PokemonList';
import user from '@testing-library/user-event';
import * as api from '../api';

jest.mock('../api');

describe('PokemonList component', () => {
  beforeAll(() => jest.clearAllMocks());
  it('renders correct Heading and Subheading', () => {
    render(<PokemonList />);
    expect(screen.getByText(/Pokedex React Challenge/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please click on a PokeBall to get its Pokemon details/i)
    ).toBeInTheDocument();
  });

  it('renders the Search input with the correct text and icon', () => {
    render(<PokemonList />);
    expect(screen.getByPlaceholderText(/Search Pokemon/i)).toBeInTheDocument();
    expect(screen.getByTestId('FaSearch')).toBeInTheDocument();
  });

  it('search for "Pikatsu" and see if item is on the screen', () => {
    render(<PokemonList />);
    const searchInput = screen.getByPlaceholderText(
      /Search Pokemon/i
    ) as HTMLInputElement;
    user.type(searchInput, 'Pikatsu');
    expect(searchInput.value).toBe('Pikatsu');
  });

  it('should test the api', async () => {
    expect(api.getPokemonsFromApi.name).toBe('bulbasaur');
  });
  // it('should render pokemon names when api responds', async () => {
  //   api.getPokemonsFromApi.mockResolvedValue({
  //     results: [{ name: 'bulbasaur' }],
  //   });
  //   render(<PokemonList />);
  //   await waitFor(() => {
  //     screen.getByText('bulbasaur');
  //   });
  // });
});
