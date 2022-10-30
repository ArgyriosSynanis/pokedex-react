import React, { useState, useEffect, useContext } from 'react';
import Search from './Search';
import SearchContext from '../context/SearchContext';
import Loading from './Loading';
import { getPokemonsFromApi } from '../api';
import { Link } from 'react-router-dom';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(false);

  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPokemonsFromApi('?limit=1154')
      .then((data) => {
        setIsLoading(false);
        setError(false);
        setPokemons(data.results);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(true);
      });
  }, []);

  const filteredPokemons =
    pokemons?.filter((pokemon: { name: string; searchTerm: string }) =>
      pokemon?.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <React.Fragment>
      <div>
        <div className="flex flex-col md:items-center md:flex-row md:justify-between mb-4 mx-4">
          <div>
            <h1 className="text-4xl">Pokedex React Challenge</h1>
            <h5>Please click on a PokeBall to get its Pokemon details</h5>
          </div>
          <Search setSearch={setSearchTerm} />
        </div>
        {error ? (
          <p>Unable to fetch data</p>
        ) : (
          <div>
            {!isLoading ? (
              <div className="flex flex-wrap">
                {!filteredPokemons.length ? (
                  <h6 className="p-2 m-4">No Pokemons found</h6>
                ) : (
                  filteredPokemons.map((pokemon: { name: string }) => (
                    <button
                      key={pokemon.name}
                      className="bg-gray-500 rounded-lg p-2 m-4 text-white"
                    >
                      <Link
                        to={`/pokemondescription/${pokemon.name}`}
                        state={pokemon.name}
                      >
                        <img
                          className="w-32 mx-auto"
                          src="./pokeball.png"
                          alt="pokeball"
                        />
                        <p className="font-bold w-32">{pokemon.name}</p>
                      </Link>
                    </button>
                  ))
                )}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PokemonList;
