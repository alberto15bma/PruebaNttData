import SERVER from "../sistema/server";

/**
 * Metodo que obtiene todos los pokemons
 *
 * @author Alberto Arias
 * @version 1.0
 * @since 21/06/2022
 */
const getPokomons = async () => {
  let res = await SERVER.consulta("?idAuthor=1", null, "GET");
  return res;
};
/**
 * Metodo que consulta por pokemon
 *
 * @author Alberto Arias
 * @version 1.0
 * @since 21/06/2022
 */
const getPokomon = async (id) => {
  let res = null;
  try {
    res = await SERVER.consulta(`/${id}`, null, "GET");
    if (res.success === false) return null;
  } catch (error) {
    res = null;
  }
  return res;
};
/**
 * Metodo que crea un pokemon
 *
 * @author Alberto Arias
 * @version 1.0
 * @since 21/06/2022
 */
const crearPokemon = async (obj) => {
  obj.idAuthor = obj.id_author;
  let res = await SERVER.consulta("?idAuthor=1", obj, "POST");
  if (res.success === false) return null;
  return res;
}
/**
 * Metodo que edita un pokemon
 *
 * @author Alberto Arias
 * @version 1.0
 * @since 21/06/2022
 */
const editarPokemon = async (obj) => {
  obj.idAuthor = obj.id_author;
  let res = await SERVER.consulta(`/${obj.id}`, obj, "PUT");
  if (res.success === false) return null;
  return res;
};
/**
 * Metodo que elimina un pokemon
 *
 * @author Alberto Arias
 * @version 1.0
 * @since 21/06/2022
 */
const eliminarPokemon = async (id) => {
  let res = await SERVER.consulta(`/${id}`, null, "DELETE");
  if (res.success === false) return null;
  if (res.error === true) return null;
  return res;
};

export {
  getPokomons,
  getPokomon,
  crearPokemon,
  editarPokemon,
  eliminarPokemon,
};