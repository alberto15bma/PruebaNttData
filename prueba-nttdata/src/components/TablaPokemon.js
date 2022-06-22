import { useContext, useEffect } from "react";
import PokemonContext from "../context/PokemonContext";
import PokemonItem from "./PokemonItem";

const TablaPokemon = () => {
  const { pokemons, cargarPokemons, borrarPokemon } =  useContext(PokemonContext);
  useEffect(() => {
    cargarPokemons();
  }, []);
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
                  borrarPokemon={borrarPokemon}
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
    </section>
  );
};
export default TablaPokemon;
