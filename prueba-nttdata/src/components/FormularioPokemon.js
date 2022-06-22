import { useContext, useEffect, useRef, useState } from "react";
import { RiSave2Fill, RiCloseFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import PokemonContext from "../context/PokemonContext";
import data from "../modelos/pokemon";
import { getPokomon } from "../services/pokemonService";
import { ERROR_OBTENER_REGISTRO } from "../sistema/mensajes";
import InputButton from "./formulario/InputButton";
import InputText from "./formulario/InputText";

const FormularioPokemon = () => {
  const { modificarPokemon, nuevoPokemon, cancelarForm } =
    useContext(PokemonContext);
  const { id } = useParams();
  const botonGuardar = useRef();
  const [form, setForm] = useState(data);
  const [esEditar, setEsEditar] = useState(false);
  let navigate = useNavigate();

  const eventoForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (form === {}) botonGuardar.current.classList.add("frm__disbled__boton");
    else botonGuardar.current.classList.remove("frm__disbled__boton");
  };

  const enviarForm = async (e) => {
    e.preventDefault();
    botonGuardar.current.classList.toggle("frm__disbled__boton");
    if (id) {
      await modificarPokemon(form);
    } else {
      await nuevoPokemon(form);
    }
  };
  const cargarData = async () => {
    try {
      setForm(data);
      if (id) {
        let data = await getPokomon(id);
        if (data !== null) {
          setEsEditar(true);
          setForm(data);
          botonGuardar.current.classList.remove("frm__disbled__boton");
        } else throw ERROR_OBTENER_REGISTRO;
      } else {
        setEsEditar(false);
        botonGuardar.current.classList.add("frm__disbled__boton");
      }
    } catch (error) {
      alert(error);
      navigate("/");
    }
  };
  useEffect(() => {
    cargarData();
  }, [id]);
  return (
    <section className="frm__agregar">
      <form onSubmit={enviarForm}>
        <h3 className="frm__titulo">
          {esEditar === true ? "Editar Pokemon" : "Nuevo Pokemon"}
        </h3>
        <section>
          <div className="frm__contenedor__input">
            <div>
              <label htmlFor="txt_nombre">Nombre: </label>
              <InputText
                placeholder="Nombre"
                nombre="name"
                icono={false}
                value={form.name}
                onChange={eventoForm}
              />
            </div>
            <div>
              <label htmlFor="txtAtaque">Ataque:</label>
              <aside>
                <span>0</span>
                <input
                  type="range"
                  id="txtAtaque"
                  name="attack"
                  value={form.attack}
                  onChange={eventoForm}
                />
                <span>100</span>
              </aside>
            </div>
          </div>
          <div className="frm__contenedor__input">
            <div>
              <label htmlFor="txt_imagen">Imagen: </label>
              <InputText
                placeholder="Url"
                nombre="image"
                value={form.image}
                icono={false}
                onChange={eventoForm}
              />
            </div>
            <div>
              <label htmlFor="txtDefensa">Defensa:</label>
              <aside>
                <span>0</span>
                <input
                  type="range"
                  id="txtDefensa"
                  name="defense"
                  value={form.defense}
                  onChange={eventoForm}
                />
                <span>100</span>
              </aside>
            </div>
          </div>
        </section>
        <div className="frm__contenedor__botones">
          <InputButton
            value="Guardar"
            clases="frm__disbled__boton"
            icono={<RiSave2Fill />}
            refer={botonGuardar}
          />
          <InputButton
            value="Cancelar"
            icono={<RiCloseFill />}
            onClick={cancelarForm}
          />
        </div>
      </form>
    </section>
  );
};
export default FormularioPokemon;
