import { expect, describe, it } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { fetch } from "cross-fetch";
import { setupServer } from "msw/node";
import usePokemonList from "./usePokemonList";

global.fetch = fetch;

const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          { name: "Pikachu", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
          { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
        ],
      })
    );
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/1/", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: "Pikachu",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "pikachu.png",
            },
          },
        },
        types: [{ type: { name: "electric" } }],
      })
    );
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/2/", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 2,
        name: "ivysaur",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "ivysaur.png",
            },
          },
        },
        types: [{ type: { name: "grass" } }],
      })
    );
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/3/", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 3,
        name: "venusaur",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "venusaur.png",
            },
          },
        },
        types: [{ type: { name: "poison" } }],
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("usePokemonList", () => {
  it("should return a list of pokemons", async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePokemonList());
    await waitForNextUpdate();
    expect(result.current.pokemonList).toEqual([
      {
        id: 1,
        name: "Pikachu",
        image: "pikachu.png",
        type: ["electric"],
      },
      {
        id: 2,
        name: "ivysaur",
        image: "ivysaur.png",
        type: ["grass"],
      },
      {
        id: 3,
        name: "venusaur",
        image: "venusaur.png",
        type: ["poison"],
      },
    ]);
  });
});
