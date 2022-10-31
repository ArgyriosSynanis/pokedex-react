import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PokemonList from '../components/PokemonList';
import * as api from '../api';
import { BrowserRouter } from 'react-router-dom';
import SearchContextProvider from '../context/SearchContextProvider';

jest.mock('../api');

describe('PokemonList component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it('should render pokemon names when api responds', async () => {
    jest.spyOn(api, 'getPokemonsFromApi').mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve({
            results: [{ name: 'bulba' }, { name: 'another pokemon' }],
          })
        )
    );
    await api.getPokemonsFromApi();

    render(
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    );

    const pokemons = await screen.findAllByTestId('pokemon');

    await waitFor(() => {
      expect(pokemons).toHaveLength(2);
    });
  });

  it('should render empty state when no pokemons are returned', async () => {
    jest.spyOn(api, 'getPokemonsFromApi').mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve({
            results: [],
          })
        )
    );
    await api.getPokemonsFromApi();

    render(
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No Pokemons found')).toBeInTheDocument();
    });
  });

  it('search for "bulbasaur" and see if item is on the screen', async () => {
    jest.spyOn(api, 'getPokemonsFromApi').mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve({
            results: [{ name: 'bulbasaur' }, { name: 'another pokemon' }],
          })
        )
    );
    await api.getPokemonsFromApi();

    render(
      <BrowserRouter>
        <SearchContextProvider>
          <PokemonList />
        </SearchContextProvider>
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText(
      /Search Pokemon/i
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'bulbasaur' } });

    await waitFor(() => {
      expect(searchInput.value).toBe('bulbasaur');
    });

    expect(screen.queryByText('another pokemon')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: 'another pokemon' } });

    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('another pokemon')).toBeInTheDocument();
    });
  });
});
