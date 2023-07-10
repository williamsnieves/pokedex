export const pokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();
  return data.results;
};

const pokemon = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const pokemonsWithAbilities = async (pokemons: any) => {
  const promises = pokemons.map((pokeData: any) => {
    return pokemon(pokeData.url);
  });
  const results = await Promise.all(promises);
  return results.map((result: any) => {
    return {
      id: result.id,
      name: result.name,
      image: result.sprites.other["official-artwork"].front_default,
      type: result.types.map((type: any) => type.type.name),
    };
  });
};
