import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Loading from './Loading';

const PokemonDescription = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    name: '',
    img: '',
    type: '',
    abilities: {
      main: '',
      secondary: '',
    },
    stats: {
      hp: '',
      attack: '',
      defense: '',
    },
  });

  useEffect(() => {
    setIsLoading(true);
    async function getPokemon() {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${location.state}`)
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setData({
            name: data?.species.name,
            img: data?.sprites.other.dream_world.front_default,
            type: data?.types[0].type.name,
            abilities: {
              main: data?.abilities[0]?.ability.name,
              secondary: data?.abilities[1]?.ability.name,
            },
            stats: {
              hp: data?.stats[0].base_stat,
              attack: data?.stats[1].base_stat,
              defense: data?.stats[2].base_stat,
            },
          });
          console.log(data);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
    getPokemon();
  }, [location.state]);

  const capitalizeFirstLetter = (string: string) =>
    string?.charAt(0).toUpperCase() + string?.slice(1);

  return (
    <>
      {!isLoading ? (
        <div className="flex justify-center">
          <div className="rounded-lg shadow-2xl bg-white max-w-sm">
            <h5 className="text-gray-900 text-center text-3xl font-medium my-2">
              {capitalizeFirstLetter(data.name)}
            </h5>
            <img
              className="mx-auto w-52"
              src={data.img}
              alt={capitalizeFirstLetter(data.name)}
            />
            <div className="p-6 text-center">
              <p className="text-gray-700 text-base mb-4">
                This Pokemon's name is{' '}
                <strong>{capitalizeFirstLetter(data?.name)}</strong>. It's type
                is <strong>{capitalizeFirstLetter(data?.type)}</strong>. The
                main abilities of {capitalizeFirstLetter(data?.name)} are{' '}
                <strong>{capitalizeFirstLetter(data?.abilities?.main)}</strong>{' '}
                and{' '}
                {data.abilities.secondary && (
                  <strong>
                    {capitalizeFirstLetter(data?.abilities?.secondary)}
                  </strong>
                )}
                .
              </p>
              <div className="flex flex-row text-gray-700 justify-between mb-4">
                <p>
                  HP: <strong>{data?.stats.hp}</strong>
                </p>
                <p>
                  Attack: <strong>{data?.stats.attack}</strong>
                </p>
                <p>
                  Defense: <strong>{data?.stats.defense}</strong>
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
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PokemonDescription;
