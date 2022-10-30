export const getPokemonsFromApi = async (param) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${param}`);
  return await res.json();
};
