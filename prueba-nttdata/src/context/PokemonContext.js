import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPokomons,
  crearPokemon,
  editarPokemon,
  eliminarPokemon,
} from "../services/pokemonService";
import {
  ERROR_CREAR_REGISTRO,
  ERROR_ELIMINAR_REGISTRO,
  ERROR_MODIFICAR_REGISTRO,
  EXITO_CREAR_REGISTRO,
  EXITO_ELIMINAR_REGISTRO,
  EXITO_MODIFICAR_REGISTRO,
} from "../sistema/mensajes";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFiltro, setPokemonsFiltro] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  let navigate = useNavigate();
  const cargarPokemons = async () => {
    try {
      let data = await getPokomons();
      setPokemons(data);
      setPokemonsFiltro(data);
    } catch (error) {
      alert(error);
    }
  };
  const nuevoPokemon = async (obj) => {
    try {
      let data = await crearPokemon(obj);
      if (data !== null) {
        alert(EXITO_CREAR_REGISTRO);
        cargarPokemons();
        navigate("/");
      } else throw ERROR_CREAR_REGISTRO;
    } catch (error) {
      alert(error);
    }
  };
  const modificarPokemon = async (obj) => {
    try {
      let data = await editarPokemon(obj);
      if (data !== null) {
        alert(EXITO_MODIFICAR_REGISTRO);
        cargarPokemons();
        navigate("/");
      } else throw ERROR_MODIFICAR_REGISTRO;
    } catch (error) {
      alert(error);
    }
  };
  const borrarPokemon = async ({ name, id }) => {
    try {
      let res = window.confirm(`¿Está seguro de eliminar el pokemon: ${name}?`);
      if (res) {
        let data = await eliminarPokemon(id);
        if (data !== null) {
          alert(EXITO_ELIMINAR_REGISTRO + id);
          cargarPokemons();
        } else throw ERROR_ELIMINAR_REGISTRO;
      }
    } catch (error) {
      alert(error);
    }
  };
  const buscarPokemon = async (e) => {
    if (e.key === "Enter") {
      if (busqueda.length > 0) {
        let filtro = pokemonsFiltro.filter(
          (e) =>
            e.name.toLowerCase() === busqueda.toLowerCase() ||
            e.id === parseInt(busqueda)
        );
        setPokemons(filtro);
      } else {
        cargarPokemons();
      }
    }
  };
  const cancelarForm = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const data = {
    pokemons,
    cargarPokemons,
    borrarPokemon,
    nuevoPokemon,
    modificarPokemon,
    cancelarForm,
    buscarPokemon,
    busqueda,
    setBusqueda,
  };
  return (
    <PokemonContext.Provider value={data}>{children}</PokemonContext.Provider>
  );
};

export { PokemonProvider };
export default PokemonContext;
