import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import * as api from '../api';
import PokemonDescription from '../components/PokemonDescription';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../api');

describe('PokemonDescription component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders the correct data', async () => {
    jest.spyOn(api, 'getPokemonsFromApi').mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve({
            abilities: [
              {
                ability: {
                  name: 'overgrow',
                },
              },
              {
                ability: {
                  name: 'chlorophyll',
                },
              },
            ],
            name: 'bulbasaur',
            sprites: {
              other: {
                dream_world: {
                  front_default:
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
                },
              },
            },
            stats: [
              {
                base_stat: 45,
                stat: { name: 'hp' },
              },
              {
                base_stat: 49,
                stat: {
                  name: 'attack',
                },
              },
              {
                base_stat: 49,
                stat: {
                  name: 'defense',
                },
              },
            ],
            types: [
              {
                type: {
                  name: 'grass',
                },
              },
            ],
          })
        )
    );

    api.getPokemonsFromApi();

    render(
      <BrowserRouter>
        <PokemonDescription />
      </BrowserRouter>
    );

    const pokemonName = await screen.findAllByText('Bulbasaur');

    await waitFor(() => {
      expect(pokemonName).toHaveLength(2);
    });

    expect(screen.getByAltText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByTestId('hp')).toHaveTextContent('45');
    expect(screen.getByTestId('attack')).toHaveTextContent('49');
    expect(screen.getByTestId('defence')).toHaveTextContent('49');
    expect(screen.getByTestId('abilityMain')).toHaveTextContent('Overgrow');
    expect(screen.getByTestId('abilitySecondary')).toHaveTextContent(
      'Chlorophyll'
    );
    expect(screen.getByTestId('type')).toHaveTextContent('Grass');
  });
});
