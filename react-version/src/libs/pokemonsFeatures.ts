import { POKEMNON_TYPE } from "../shared/constants";

export const getGender = (genderRate: number) => {
  if (genderRate === -1) {
    return "Unknown";
  }
  const femaleRate = (genderRate / 8) * 100;
  const maleRate = 100 - femaleRate;
  return `Male: ${maleRate}%, Female: ${femaleRate}%`;
};

export const getWeaknesses = async (types: string[]) => {
  const weaknesses = [];
  for (const type of types) {
    const response = await fetch(`${POKEMNON_TYPE}${type}`);
    const data = await response.json();

    const doubleDamageFrom = data.damage_relations.double_damage_from.map(
      (damage: { name: string; url: string }) => damage.name
    );
    weaknesses.push(...doubleDamageFrom);
  }
  return Array.from(new Set(weaknesses));
};
