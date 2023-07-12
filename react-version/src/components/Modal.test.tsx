import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal", () => {
  it("should render the modal", () => {
    const onCloseModal = vi.fn();
    const title = "Modal Title";
    const selectedPokemon = {
      name: "bulbasaur",
      type: ["grass", "poison"],
      id: 1,
      image: "assets/images/pokemon/1.png",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    };
    render(
      <Modal
        onCloseModal={onCloseModal}
        title={title}
        selectedPokemon={selectedPokemon}
      />
    );
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("should call onCloseModal when the close button is clicked", async () => {
    const onCloseModal = vi.fn();
    const title = "Modal Title";
    const selectedPokemon = {
      name: "bulbasaur",
      type: ["grass", "poison"],
      id: 1,
      image: "assets/images/pokemon/1.png",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    };
    render(
      <Modal
        onCloseModal={onCloseModal}
        title={title}
        selectedPokemon={selectedPokemon}
      />
    );
    await userEvent.click(screen.getByText("Close"));
    expect(onCloseModal).toHaveBeenCalled();
  });
});
