import { useState } from "react";
import { createPortal } from "react-dom";
import { Pokemons } from "../Pokemons";
import Modal from "../Modal";
import usePokemonList from "../../hooks/usePokemonList";

export type selectedPokemonType = {
  id: number;
  name: string;
  image: string;
  type: string[];
};

const PokemonLayout = () => {
  const { pokemonList } = usePokemonList();
  const [showModal, setShowModal] = useState(false);
  const initialSelectedPokemon = {
    id: 0,
    name: "",
    image: "",
    type: [],
  };
  const [selectedPokemon, setSelectedPokemon] = useState(
    initialSelectedPokemon as selectedPokemonType,
  );

  const handlePokemonDetail = (id: number) => {
    setShowModal(true);
    const selectedPokemon = pokemonList.find(
      (pokemon: any) => pokemon.id === id,
    );
    setSelectedPokemon(selectedPokemon ?? initialSelectedPokemon);
  };
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center mt-6">
        Pokedex App
      </h1>
      <Pokemons list={pokemonList} onShowDetail={handlePokemonDetail} />
      {showModal
        ? createPortal(
            <Modal
              onCloseModal={() => setShowModal(false)}
              title={`${selectedPokemon?.name
                .charAt(0)
                .toUpperCase()}${selectedPokemon?.name.slice(
                1,
              )}, Nº ${selectedPokemon?.id}`}
              selectedPokemon={selectedPokemon}
            />,
            document.getElementById("modal-root") as HTMLElement,
          )
        : null}
    </>
  );
};

export default PokemonLayout;
