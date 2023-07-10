import { PokemonDetailType } from "../components/PokemonDetail";

type pokemonsStatsForChartType = {
  pokemonDetail: PokemonDetailType;
};

export const pokemonsStatsForChart = ({
  pokemonDetail,
}: pokemonsStatsForChartType) => {
  return {
    labels: pokemonDetail.stats?.map((stat) => stat.name),
    datasets: [
      {
        data: pokemonDetail.stats?.map((stat) => stat.value),
        backgroundColor: [
          "#FF6384", // hp
          "#36A2EB", // attack
          "#FFCE56", // defense
          "#FF9F40", // special-attack
          "#4BC0C0", // special-defense
          "#FFD6A5", // speed
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
          "#FFD6A5",
        ],
      },
    ],
  };
};
