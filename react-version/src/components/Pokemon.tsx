import { FC } from "react";
import { selectedPokemonType } from "./layouts/PokemonLayout";

type PokemonPropsType = {
  pokemon: selectedPokemonType;
  onShowDetail: (id: number) => void;
};

export const Pokemon: FC<PokemonPropsType> = ({ pokemon, onShowDetail }) => {
  const handlePokemonDetail = () => {
    onShowDetail(pokemon.id);
  };

  return (
    <div
      key={pokemon.name}
      data-testid="pokemon"
      className="bg-gray-200 rounded-lg shadow-md"
      onClick={handlePokemonDetail}
    >
      <div className="flex justify-between p-3">
        <p>#{pokemon.id}</p>
        <div className="flex gap-2">
          {pokemon.type.map((type) => {
            return (
              <p key={type} className="bg-orange-400 text-white p-2 rounded-lg">
                {type}
              </p>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col-reverse items-center">
        <p className="text-xl font-bold rounded-b-lg p-2 bg-black/[.5] w-full text-center text-slate-300">
          {pokemon.name}
        </p>
        <img className="w-32 h-32" src={pokemon.image} alt={pokemon.name} />
      </div>
    </div>
  );
};
