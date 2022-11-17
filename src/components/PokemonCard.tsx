import React from 'react';
import { Link } from 'react-router-dom';
import { PokemonListItem } from '../types/pokemon';

const PokemonCard = ({ pokemon }: any) => {
  return (
    <div className="grid lg:grid-cols-5 sm:grid-cols-3 gap-x-6">
      {pokemon.map((pokemon: PokemonListItem) => (
        <button
          key={pokemon.id}
          data-testid="pokemon"
          className="bg-white rounded-lg p-2 my-8 mx-4 text-gray-700 shadow-xl border border-gray-200 hover:scale-125 transition-all duration-150 ease-in-out"
        >
          <Link to={`/pokemondescription/${pokemon.name}`} state={pokemon.name}>
            <img
              className="w-24 mx-auto -mt-10"
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />
            <p className="font-bold w-32 mx-auto">{pokemon.name}</p>
          </Link>
        </button>
      ))}
    </div>
  );
};

export default PokemonCard;
