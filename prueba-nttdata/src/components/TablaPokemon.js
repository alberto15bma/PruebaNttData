import { useContext, useEffect, useState } from "react";
import PokemonContext from "../context/PokemonContext";
import Modal from "./formulario/Modal";
import PokemonItem from "./PokemonItem";

const TablaPokemon = () => {
  const { pokemons, cargarPokemons, borrarPokemon } =
    useContext(PokemonContext);
  const [idPokemon, setIdPokemon] = useState(0);
  const [visibleModalEliminar, setVisibleModalEliminar] = useState(false);
  useEffect(() => {
    cargarPokemons();
  }, []);
  const confirmarBorrarPokemon = async (pokemon) => {
    setIdPokemon(pokemon.id);
    setVisibleModalEliminar(true);
  };
  return (
    <section className="main__principal">
      <div>
        <table className="main__table__contenido">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Ataque</th>
              <th>Defensa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pokemons && pokemons.length > 0 ? (
              pokemons.map((e) => (
                <PokemonItem
                  key={e.id}
                  pokemon={e}
                  borrarPokemon={() => confirmarBorrarPokemon(e)}
                />
              ))
            ) : (
              <tr className="main__table__vacio">
                <td colSpan={5}> Sin Datos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        visible={visibleModalEliminar}
        titulo="Eliminar pokemon"
        onClickSi={() => borrarPokemon(idPokemon, setVisibleModalEliminar)}
        onClickNo={() => setVisibleModalEliminar(false)}
      >
        ¿Estás seguro de borrar el pokemon con ID: {idPokemon}?
      </Modal>
    </section>
  );
};
export default TablaPokemon;
