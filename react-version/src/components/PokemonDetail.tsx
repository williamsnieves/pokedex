import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { selectedPokemonType } from "./layouts/PokemonLayout";
import { pokemonsStatsForChart } from "../libs/stats";
import usePokemonDetail from "../hooks/usePokemonDetail";

Chart.register(ArcElement, Tooltip, Legend);

type PokemonDetailProps = {
  selectedPokemon: selectedPokemonType;
};

type StatsType = {
  name: string;
  value: number;
};

export type PokemonDetailType = {
  description: string;
  gender: string;
  category: string[];
  weaknesses: string[];
  height: number;
  weight: number;
  type: string[];
  image: string;
  stats: StatsType[];
};

export const PokemonDetail: FC<PokemonDetailProps> = ({ selectedPokemon }) => {
  const { pokemonDetail } = usePokemonDetail(selectedPokemon);

  return (
    <div className="relative p-6 flex overflow-scroll">
      <div className="w-full flex-1">
        <img
          className="w-full"
          src={pokemonDetail.image}
          alt={`Pokemon ${selectedPokemon.name}`}
        />
        <h3 className="text-xl text-center">Stats</h3>
        <Doughnut width={60} data={pokemonsStatsForChart({ pokemonDetail })} />
      </div>
      <div className="flex-1">
        <p className="my-4 text-slate-500 text-lg leading-relaxed">
          {pokemonDetail.description}
        </p>
        <div className="bg-[#30a7d6] rounded-lg p-3 flex">
          <div>
            <p className="basis-2" data-testid="height">
              <span className="text-white">Height: </span>
              {pokemonDetail.height}
            </p>
            <p className="basis-2" data-testid="weight">
              <span className="text-white">Weight: </span>
              {pokemonDetail.weight}
            </p>
            <p className="basis-2" data-testid="category">
              <span className="text-white">Category: </span>
              {pokemonDetail.category}
            </p>
          </div>
          <div>
            <p className="basis-2">
              <span className="text-white">Gender: </span>
              {pokemonDetail.gender}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-xl">Type</h3>
          <div className="flex gap-2 mt-2" data-testid="type">
            {pokemonDetail.type?.map((type) => {
              return (
                <p className="bg-orange-400 text-white p-2 rounded-lg">
                  {type}
                </p>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-xl">Weaknesses</h3>
          <div className="flex gap-2 mt-2" data-testid="weaknesses">
            {pokemonDetail.weaknesses?.map((weak) => {
              return (
                <p className="bg-blue-400 text-white p-2 rounded-lg">{weak}</p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
