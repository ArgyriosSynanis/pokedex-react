import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Loading from './Loading';
import { getPokemonsFromApi } from '../api';
import { Pokemon } from '../types/pokemon';
import Page from './Page';

const PokemonDescription = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<Pokemon | undefined>();

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const pokemonResponse = await getPokemonsFromApi(location.state);

        setIsLoading(false);
        setPokemon({
          name: pokemonResponse?.name,
          img: pokemonResponse?.sprites.other.dream_world.front_default,
          type: pokemonResponse?.types[0].type.name,
          abilities: {
            main: pokemonResponse?.abilities[0]?.ability.name,
            secondary: pokemonResponse?.abilities[1]?.ability.name,
          },
          stats: {
            hp: pokemonResponse?.stats[0].base_stat,
            attack: pokemonResponse?.stats[1].base_stat,
            defense: pokemonResponse?.stats[2].base_stat,
          },
        });
      } catch (e) {
        setIsLoading(false);
        setError(true);
      }
    };

    getPokemon();
  }, [location.state]);

  const capitalizeFirstLetter = (string: string | undefined) => {
    if (string) {
      return string?.charAt(0).toUpperCase() + string?.slice(1);
    }
  };

  if (isLoading && !pokemon) {
    return <Loading />;
  }

  if (!isLoading && error) {
    return <p>Oops! something went wrong</p>;
  }

  return (
    <Page>
      <div className="flex justify-center">
        <div className="rounded-lg shadow-2xl bg-white max-w-sm">
          <h5 className="text-gray-900 text-center text-3xl font-medium my-2">
            {capitalizeFirstLetter(pokemon?.name)}
          </h5>
          <img
            className="mx-auto w-52"
            src={pokemon?.img}
            alt={capitalizeFirstLetter(pokemon?.name)}
          />
          <div className="p-6 text-center">
            <p className="text-gray-700 text-base mb-4">
              This Pokemon's name is{' '}
              <strong data-testid="name">
                {capitalizeFirstLetter(pokemon?.name)}
              </strong>
              . It's type is{' '}
              <strong data-testid="type">
                {capitalizeFirstLetter(pokemon?.type)}
              </strong>
              . The main abilities of {capitalizeFirstLetter(pokemon?.name)} are{' '}
              <strong data-testid="abilityMain">
                {capitalizeFirstLetter(pokemon?.abilities?.main)}
              </strong>{' '}
              and{' '}
              {pokemon?.abilities.secondary && (
                <strong data-testid="abilitySecondary">
                  {capitalizeFirstLetter(pokemon?.abilities?.secondary)}
                </strong>
              )}
              .
            </p>
            <div className="flex flex-row text-gray-700 justify-between mb-4">
              <p>
                HP: <strong data-testid="hp">{pokemon?.stats.hp}</strong>
              </p>
              <p>
                Attack:{' '}
                <strong data-testid="attack">{pokemon?.stats.attack}</strong>
              </p>
              <p>
                Defense:{' '}
                <strong data-testid="defence">{pokemon?.stats.defense}</strong>
              </p>
            </div>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              <Link to="/">Back to search</Link>
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PokemonDescription;
