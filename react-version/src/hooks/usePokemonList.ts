import { useEffect, useState } from "react";
import { pokemons, pokemonsWithAbilities } from "../services/pokemons";

const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await pokemonsWithAbilities(await pokemons());
        setPokemonList(response as any);
      } catch (err) {
        console.error("should be showed in sengrid---", err);
      }
    };

    fetchPokemons();
  }, []);

  return { pokemonList };
};

export default usePokemonList;
