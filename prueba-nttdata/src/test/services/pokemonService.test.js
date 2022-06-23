import {
  getPokomons,
  getPokomon,
  crearPokemon,
  editarPokemon,
  eliminarPokemon,
} from "../../services/pokemonService";

describe("Test del servicio PokemonService", () => {
  // 1.- Se prueba si se obtiene correctamente los registros "Pokemon"
  it("Este test devuelve todos los pokemones - metodo (getPokomons) - Debe dar correcto", async () => {
    const res = await getPokomons();
    expect(res[0].id).toEqual(119);
  });
  // 2.- Se prueba si se obtiene correctamente un pokemon individual "Pokemon"
  it("Este test devuelve un pokemon - metodo (getPokomon) - Debe dar correcto", async () => {
    const res = await getPokomon(119);
    expect(res.id).toEqual(119);
  });
  // 2.- Se prueba si se crea correctamente un pokemon "Pokemon"
  it("Este test crea un nuevo pokemon - metodo (crearPokemon) - Debe dar correcto", async () => {
    const data = {
      defense: "83",
      attack: "26",
      name: "Alberto 2",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/258.png",
      hp: 100,
      type: "normal",
      id_author: 1,
    };
    const res = await crearPokemon(data);
    expect(res.name).toEqual("Alberto 2");
  });
  // 3.- Se prueba si se modifica correctamente un pokemon "Pokemon"
  it("Este test modifica un pokemon - metodo (editarPokemon) - Debe dar correcto", async () => {
    const data = {
      id: 119,
      defense: "83",
      attack: "26",
      name: "Alberto 3",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/258.png",
      hp: 100,
      type: "normal",
      id_author: 1,
    };
    const res = await editarPokemon(data);
    expect(res.name).toEqual("Alberto 3");
  });
  // 4.- Se prueba si se elimina correctamente un pokemon "Pokemon"
  it("Este test elimina un nuevo pokemon - metodo (editarPokemon) - Debe dar incorrecto porque no existe el id enviado", async () => {
    const res = await eliminarPokemon(150);
    expect(res).toEqual(null);
  });
});
