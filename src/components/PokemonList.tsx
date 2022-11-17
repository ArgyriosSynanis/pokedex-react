import React, { useState, useEffect, useContext, useCallback } from 'react';
import Search from './Search';
import SearchContext from '../context/SearchContext';
import Loading from './Loading';
import { PokemonListItem, PokemonListResults } from '../types/pokemon';
import Page from './Page';
import Pagination from './Pagination';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const [currentUrl, setCurrentUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon/'
  );
  const [pokemons, setPokemons] = useState<PokemonListResults | []>([]);
  const [fetchAllPokemons, setFetchAllPokemons] = useState<
    PokemonListResults | []
  >([]);
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const goToPrevPage = () => {
    setPokemons([]);
    setCurrentUrl(prevPageUrl);
  };
  const goToNextPage = () => {
    setPokemons([]);
    setCurrentUrl(nextPageUrl);
  };

  const getPokemonUrl = async (res: PokemonListResults) => {
    res.map(async (item: PokemonListItem) => {
      const result = await fetch(item.url).then((res) => res.json());
      setPokemons((state) => {
        state = [...state, result];
        return state.sort((a, b) => (a.id > b.id ? 1 : -1));
      });
    });
  };

  const getPokemons = useCallback(async () => {
    const pokemonResponse = await fetch(currentUrl).then((res) => res.json());
    try {
      setIsLoading(false);
      setError(false);
      setPrevPageUrl(pokemonResponse.previous);
      setNextPageUrl(pokemonResponse.next);
      getPokemonUrl(pokemonResponse.results);
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  }, [currentUrl]);

  const getFullPokemons = useCallback(async () => {
    try {
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokemon/?limit=1154'
      ).then((res) => res.json());
      setIsLoading(false);
      setError(false);
      setFetchAllPokemons(res.results);
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  }, []);

  const filteredPokemons = fetchAllPokemons?.filter(
    (pokemon: PokemonListItem) =>
      pokemon?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getPokemons();
    getFullPokemons();
  }, [getFullPokemons, getPokemons]);

  if (!isLoading && error) {
    return <p>Oops! something went wrong</p>;
  }

  return (
    <>
      <div className="bg-gray-200">
        <div className="flex flex-col md:items-center md:flex-row md:justify-between mb-4 max-w-screen-xl mx-auto md:px-8 px-4 py-8">
          <div>
            <h1 className="text-4xl">Pokedex React Challenge</h1>
            <h5>Please click on a Pokemon to get its details</h5>
          </div>
          <Search pokemon={filteredPokemons} />
        </div>
      </div>
      <Page>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <PokemonCard pokemon={pokemons} />
              <Pagination
                prevPageUrl={prevPageUrl}
                nextPageUrl={nextPageUrl}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage}
              />
            </div>
          )}
        </div>
      </Page>
    </>
  );
};

export default PokemonList;
