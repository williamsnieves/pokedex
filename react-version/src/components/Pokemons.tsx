import { FC } from "react";
import { selectedPokemonType } from "./layouts/PokemonLayout";
import { Pokemon } from "./Pokemon";

type PokemonsPropsType = {
  list: selectedPokemonType[];
  onShowDetail: (id: number) => void;
};

export const Pokemons: FC<PokemonsPropsType> = ({ list, onShowDetail }) => {
  return (
    <div className="max-w-screen-2xl grid grid-cols-1 gap-4 m-8 md:grid-cols-2 lg:grid-cols-4 lg:my-0 lg:mx-auto lg:p-6">
      {list.map((pokemon: any) => (
        <Pokemon
          key={pokemon.id}
          pokemon={pokemon}
          onShowDetail={onShowDetail}
        />
      ))}
    </div>
  );
};
