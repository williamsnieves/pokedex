import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pokemon } from "./Pokemon";

describe("Pokemon", () => {
  const mockPokemon = {
    id: 1,
    name: "Pikachu",
    type: ["Electric"],
    image: "pikachu.jpg",
  };

  const mockShowDetail = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render pokemon information", async () => {
    const pokemon = {
      id: 1,
      name: "bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      type: ["grass", "poison"],
    };

    render(<Pokemon pokemon={pokemon} onShowDetail={mockShowDetail} />);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("grass")).toBeInTheDocument();
    expect(screen.getByText("poison")).toBeInTheDocument();
  });

  it("should call the onShowDetail function when clicked", async () => {
    const { getByTestId } = render(
      <Pokemon pokemon={mockPokemon} onShowDetail={mockShowDetail} />
    );

    await userEvent.click(getByTestId("pokemon"));

    expect(mockShowDetail).toHaveBeenCalledTimes(1);
  });
});
