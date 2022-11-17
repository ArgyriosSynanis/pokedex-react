import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { PokemonListItem } from '../types/pokemon';
import SearchContext from '../context/SearchContext';

interface SearchProps {
  pokemon: any;
}

const Search = ({ pokemon }: SearchProps) => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchTerm) {
      setSearchTerm(e.target.value);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search Pokemon"
          className="px-5 py-3 border-gray-400 border rounded w-full"
          onChange={searchHandler}
        />

        <FaSearch
          className="absolute top-3.5 right-3.5 text-gray-400"
          size={20}
          data-testid="FaSearch"
        />
      </div>
      <div className="absolute w-full top-full left-0 z-10">
        {searchTerm.length > 0 && (
          <ul className="bg-white w-full shadow-2xl border border-gray-200 overflow-y-scroll h-56">
            {!pokemon.length ? (
              <h6 className="bg-white border-b border-gray-500 w-full p-2">
                No Pokemons found
              </h6>
            ) : (
              pokemon.map((pokemon: PokemonListItem) => (
                <div key={pokemon.id}>
                  <Link
                    to={`/pokemondescription/${pokemon.name}`}
                    state={pokemon.name}
                    onClick={() => setSearchTerm('')}
                  >
                    <li className="w-full pb-1 text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                      <p className="relative p-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
                        {pokemon.name}
                      </p>
                    </li>
                  </Link>
                </div>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
