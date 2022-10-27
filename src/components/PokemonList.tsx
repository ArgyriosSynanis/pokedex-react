import React, { useState, useEffect, useContext } from 'react';
import Search from './Search';
import SearchContext from '../context/SearchContext';
import { Link } from 'react-router-dom';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);
    async function getPokemon() {
      await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1154')
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setPokemons(data.results);
          console.log(data.results);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
    getPokemon();
  }, []);

  const filteredPokemons =
    pokemons?.filter((pokemon: { name: string; searchTerm: string }) =>
      pokemon?.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <React.Fragment>
      <div>
        <div className="flex flex-col md:items-center md:flex-row md:justify-between mb-4 mx-4">
          <h1 className="text-4xl">Gotta catch em all!</h1>
          <Search setSearch={setSearchTerm} />
        </div>
        {!isLoading ? (
          <div>
            {!filteredPokemons.length ? (
              <h5 className="p-2 m-4">No Pokemons found</h5>
            ) : (
              filteredPokemons.map((pokemon: { name: string }) => (
                <button
                  key={pokemon.name}
                  className="bg-gray-400 rounded-lg p-2 m-4 text-white"
                >
                  <p>
                    <Link
                      to={`/pokemondescription/${pokemon.name}`}
                      state={pokemon.name}
                    >
                      {pokemon.name}
                    </Link>
                  </p>
                </button>
              ))
            )}
          </div>
        ) : (
          <p className="p-2 m-4">Loading....</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default PokemonList;
