import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PokemonDetail } from "./PokemonDetail";
import usePokemonDetail from "../hooks/usePokemonDetail";

/*vi.mock("../hooks/usePokemonDetail", () => ({
  usePokemonDetail: () => ({
    pokemonDetail: {
      description: "bulbasaur description",
      gender: "male: 10%, female: 90%",
      category: ["grass", "poison"],
      height: 10,
      weight: 10,
      weaknesses: ["fire", "ice"],
      type: ["grass", "poison"],
      image: "bulbasaur.png",
      stats: [
        {
          name: "hp",
          value: 10,
        },
        {
          name: "attack",
          value: 10,
        },
      ],
    },
  }),
}));*/

/*vi.mock("../hooks/usePokemonDetail", async () => {
  const actual = await vi.importActual("../hooks/usePokemonDetail");
  return { ...actual, description: "bulbasaur description" };
});*/

vi.mock("react-chartjs-2", () => ({
  Chart: vi.fn(),
  Doughnut: vi.fn(),
}));

vi.mock("../hooks/usePokemonDetail", () => {
  return {
    default: () => ({
      pokemonDetail: {
        description: "bulbasaur description",
        gender: "male: 10%, female: 90%",
        category: ["grass", "poison"],
        height: 10,
        weight: 10,
        weaknesses: ["fire", "ice"],
        type: ["grass", "poison"],
        image: "bulbasaur.png",
      },
    }),
  };
});

beforeEach(() => {
  // you can access variables inside a factory
  vi.doMock("../hooks/usePokemonDetail", () => ({
    pokemonDetail: { description: "bulbasaur description" },
  }));
});

describe("PokemonDetail", () => {
  it("should render details of pokemon", () => {
    const selectedPokemon = {
      name: "bulbasaur",
      type: ["grass", "poison"],
      id: 1,
      image: "bulbasaur.png",
    };
    render(<PokemonDetail selectedPokemon={selectedPokemon} />);
    expect(screen.getByText("bulbasaur description")).toBeInTheDocument();
    expect(screen.getByText("male: 10%, female: 90%")).toBeInTheDocument();
    expect(screen.getByTestId("category").textContent).toBe(
      "Category: grasspoison"
    );
    expect(screen.getByTestId("height").textContent).toBe("Height: 10");
    expect(screen.getByTestId("weight").textContent).toBe("Weight: 10");
    expect(screen.getByTestId("weaknesses").textContent).toBe("fireice");
    expect(screen.getByTestId("type").textContent).toBe("grasspoison");
    expect(screen.getByRole("img")).toHaveAttribute("src", "bulbasaur.png");
  });
});
