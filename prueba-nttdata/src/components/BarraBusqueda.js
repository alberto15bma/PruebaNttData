import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import PokemonContext from "../context/PokemonContext";
import InputButton from "./formulario/InputButton";
import InputText from "./formulario/InputText";

const BarraBusqueda = () => {
  let navigate = useNavigate();
  const { buscarPokemon, setBusqueda, busqueda } = useContext(PokemonContext);

  return (
    <header className="header">
      <h3 className="header__titulo frm__titulo">Listado de pokemon</h3>
      <div className="header__busqueda">
        <div className="contenedor__input">
          <BiSearch className="input__icon" />
          <InputText
            placeholder="Buscar"
            nombre="Buscar"
            icono={true}
            value={busqueda}
            onkeydown={buscarPokemon}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <InputButton
          value="Nuevo"
          icono={<AiOutlinePlus />}
          onClick={() => navigate("/agregar")}
        />
      </div>
    </header>
  );
};
export default BarraBusqueda;
