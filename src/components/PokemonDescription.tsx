import React, { useEffect, useState } from 'react';
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
        <div
          className={`rounded-lg shadow-2xl max-w-sm bg-pokemon-${pokemon?.type}`}
        >
          <h5 className="text-white text-center text-3xl font-medium my-2">
            {capitalizeFirstLetter(pokemon?.name)}
          </h5>
          <img
            className="mx-auto w-52"
            src={pokemon?.img}
            alt={capitalizeFirstLetter(pokemon?.name)}
          />
          <div className="p-6 text-center">
            <p className="text-white text-base mb-4">
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
            <div className="flex flex-row text-white justify-between mb-4">
              <p>
                HP: <strong data-testid="hp">{pokemon?.stats.hp}</strong>
              </p>
              <p>
                Attack:{' '}
                <strong data-testid="attack">{pokemon?.stats.attack}</strong>
              </p>
              <p>
                Defense:{' '}
                <strong data-testid="defense">{pokemon?.stats.defense}</strong>
              </p>
            </div>
            <button
              type="button"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text- font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-800 to-blue-500 group-hover:from-blue-800 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <Link to="/">
                <p className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Back to search
                </p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PokemonDescription;
