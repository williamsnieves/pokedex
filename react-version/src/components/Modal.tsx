import { PokemonDetail } from "./PokemonDetail";
import { selectedPokemonType } from "./layouts/PokemonLayout";

type ModalProps = {
  onCloseModal: () => void;
  title: string;
  selectedPokemon: selectedPokemonType;
};

export default function Modal({
  onCloseModal,
  title,
  selectedPokemon,
}: ModalProps) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold text-center  w-full">
                {title}
              </h3>
            </div>
            <PokemonDetail selectedPokemon={selectedPokemon} />
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
