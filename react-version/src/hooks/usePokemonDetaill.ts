import { useEffect, useState } from "react";
import { PokemonDetailType } from "../components/PokemonDetail";
import { POKEMON_URL } from "../shared/constants";
import { getGender, getWeaknesses } from "../libs/pokemonsFeatures";
import { selectedPokemonType } from "../components/layouts/PokemonLayout";

type StatsOriginalType = {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
};

type PokemonEntryType = {
  flavor_text: string;
  language: { name: string; url: string };
  version: { name: string; url: string };
};

type PokemonGenraType = {
  genus: string;
  language: { name: string; url: string };
};

type PokemonType = {
  slot: number;
  type: { name: string; url: string };
};

const usePokemonDetail = (selectedPokemon: selectedPokemonType) => {
  const [pokemonDetail, setPokemonDetail] = useState({} as PokemonDetailType);

  useEffect(() => {
    const pokemonDetail = async () => {
      try {
        const response = await fetch(
          POKEMON_URL.replace(":id", selectedPokemon.id.toString() as string)
        );
        const data = await response.json();
        const pokemonSpecies = await fetch(data.species.url);
        const dataSpecies = await pokemonSpecies.json();
        const description = dataSpecies.flavor_text_entries.find(
          (entry: PokemonEntryType) => entry.language.name === "en"
        ).flavor_text;

        const genderRate = dataSpecies.gender_rate;
        const gender = getGender(genderRate);

        const category = dataSpecies.genera.find(
          (genus: PokemonGenraType) => genus.language.name === "en"
        ).genus;

        const type = data.types.map((type: PokemonType) => type.type.name);
        const weaknesses = await getWeaknesses(type);

        const detail = {
          description,
          gender,
          category,
          weaknesses,
          image: data.sprites.other["official-artwork"].front_default,
          weight: data.weight,
          height: data.height,
          type,
          stats: data.stats.map((stat: StatsOriginalType) => {
            return {
              name: stat.stat.name,
              value: stat.base_stat,
            };
          }),
        };

        setPokemonDetail(detail);
      } catch (err) {
        console.error(err);
      }
    };

    pokemonDetail();
  }, []);

  return { pokemonDetail };
};

export default usePokemonDetail;
