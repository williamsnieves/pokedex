import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pokemons } from "./Pokemons";

describe("Pokemons", () => {
  it("should render pokemon list", async () => {
    const mockPokemons = [
      {
        id: 1,
        name: "Pikachu",
        type: ["Electric"],
        image: "pikachu.jpg",
      },
      {
        id: 1,
        name: "Charmander",
        type: ["Fire"],
        image: "charmander.jpg",
      },
    ];

    const mockShowDetail = vi.fn();

    render(<Pokemons list={mockPokemons} onShowDetail={mockShowDetail} />);

    expect(await screen.findAllByTestId("pokemon")).toHaveLength(2);
  });
});
