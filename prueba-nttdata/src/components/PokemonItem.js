import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const PokemonItem = ({ pokemon, borrarPokemon }) => {
  return (
    <tr key={pokemon.id}>
      <td data-th="Nombre">{pokemon.name}</td>
      <td data-th="Imagen">
        <img src={pokemon.image} alt={pokemon.name} />
      </td>
      <td data-th="Ataque">{pokemon.attack}</td>
      <td data-th="Defensa">{pokemon.defense}</td>
      <td>
        <Link
          to={"editar/" + pokemon.id}
          className="main__table__contenido__btn"
        >
          <AiFillEdit />
        </Link>
        <button className="main__table__contenido__btn" onClick={borrarPokemon}>
          <RiDeleteBin2Fill />
        </button>
      </td>
    </tr>
  );
};

export default PokemonItem;
