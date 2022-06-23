import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPokomons,
  crearPokemon,
  editarPokemon,
  eliminarPokemon,
} from "../services/pokemonService";
import {
  ALERTA_NO_EXSITEN_DATOS_GRILLA,
  ERROR_CREAR_REGISTRO,
  ERROR_ELIMINAR_REGISTRO,
  ERROR_MODIFICAR_REGISTRO,
  EXITO_CREAR_REGISTRO,
  EXITO_ELIMINAR_REGISTRO,
  EXITO_MODIFICAR_REGISTRO,
} from "../sistema/mensajes";
import dataNotificacion from "../modelos/notificacion";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFiltro, setPokemonsFiltro] = useState([]);
  const [notificacion, setNotificacion] = useState(dataNotificacion);

  const [busqueda, setBusqueda] = useState("");
  let navigate = useNavigate();
  const cargarPokemons = async () => {
    try {
      let data = await getPokomons();
      setPokemons(data);
      setPokemonsFiltro(data);
    } catch (error) {
      mostrarNotificacion({ tipo: "alert", mensaje: error, visible: true });
    }
  };
  const nuevoPokemon = async (obj) => {
    try {
      let data = await crearPokemon(obj);
      if (data !== null) {
        mostrarNotificacion({
          tipo: "exito",
          mensaje: EXITO_CREAR_REGISTRO,
          visible: true,
        });
        cargarPokemons();
        navigate("/");
      } else throw ERROR_CREAR_REGISTRO;
    } catch (error) {
      mostrarNotificacion({ tipo: "error", mensaje: error, visible: true });
    }
  };
  const modificarPokemon = async (obj) => {
    try {
      let data = await editarPokemon(obj);
      if (data !== null) {
        mostrarNotificacion({
          tipo: "exito",
          mensaje: EXITO_MODIFICAR_REGISTRO,
          visible: true,
        });
        cargarPokemons();
        navigate("/");
      } else throw ERROR_MODIFICAR_REGISTRO;
    } catch (error) {
      mostrarNotificacion({ tipo: "error", mensaje: error, visible: true });
    }
  };
  const borrarPokemon = async (id, setVisibleModalEliminar) => {
    setVisibleModalEliminar(false);
    try {
      let data = await eliminarPokemon(id);
      if (data !== null) {
        mostrarNotificacion({
          tipo: "exito",
          mensaje: EXITO_ELIMINAR_REGISTRO + id,
          visible: true,
        });
        cargarPokemons();
      } else throw ERROR_ELIMINAR_REGISTRO;
    } catch (error) {
      mostrarNotificacion({ tipo: "error", mensaje: error, visible: true });
    }
  };
  const buscarPokemon = async (e) => {
    if (e.key === "Enter") {
      if (pokemonsFiltro.length <= 0) {
        mostrarNotificacion({
          tipo: "alert",
          mensaje: ALERTA_NO_EXSITEN_DATOS_GRILLA,
          visible: true,
        });
        return false;
      }
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
  const mostrarNotificacion = (data) => {
    setNotificacion(data);
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
    notificacion,
    mostrarNotificacion,
    setNotificacion,
  };
  return (
    <PokemonContext.Provider value={data}>{children}</PokemonContext.Provider>
  );
};

export { PokemonProvider };
export default PokemonContext;
