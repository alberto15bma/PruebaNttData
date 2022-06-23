import { useContext, useEffect, useRef, useState } from "react";
import { RiSave2Fill, RiCloseFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import PokemonContext from "../context/PokemonContext";
import data from "../modelos/pokemon";
import { getPokomon } from "../services/pokemonService";
import {
  ERROR_CAMPO_IMAGEN,
  ERROR_CAMPO_NOMBRE,
  ERROR_OBTENER_REGISTRO,
} from "../sistema/mensajes";
import InputButton from "./formulario/InputButton";
import InputText from "./formulario/InputText";
import Modal from "./formulario/Modal";

const FormularioPokemon = () => {
  const { modificarPokemon, nuevoPokemon, cancelarForm, mostrarNotificacion } =
    useContext(PokemonContext);
  const { id } = useParams();
  const botonGuardar = useRef();
  const [form, setForm] = useState(data);
  const [esEditar, setEsEditar] = useState(false);
  const [visibleModalNuevo, setVisibleModalNuevo] = useState(false);
  let navigate = useNavigate();

  const eventoForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (form === {}) botonGuardar.current.classList.add("frm__disbled__boton");
    else botonGuardar.current.classList.remove("frm__disbled__boton");
  };
  const confirmarEnvioForm = async (e) => {
    e.preventDefault();
    if (id) {
      await modificarPokemon(form);
    } else {
      botonGuardar.current.classList.add("frm__disbled__boton");
      setVisibleModalNuevo(true);
      botonGuardar.current.classList.remove("frm__disbled__boton");
    }
  };
  const enviarForm = async (e) => {
    setVisibleModalNuevo(false);
    if (form.name.length <= 0) {
      alert(ERROR_CAMPO_NOMBRE);
      mostrarNotificacion({
        tipo: "error",
        mensaje: ERROR_CAMPO_NOMBRE,
        visible: true,
      });
      return;
    }
    if (form.image.length <= 0) {
      mostrarNotificacion({
        tipo: "error",
        mensaje: ERROR_CAMPO_IMAGEN,
        visible: true,
      });
      return;
    }
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
      mostrarNotificacion({
        tipo: "error",
        mensaje: error,
        visible: true,
      });
      navigate("/");
    }
  };
  useEffect(() => {
    cargarData();
    window.scrollTo(0, document.body.scrollHeight);
  }, [id]);
  return (
    <section className="frm__agregar">
      <form onSubmit={confirmarEnvioForm}>
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
      <Modal
        visible={visibleModalNuevo}
        titulo="Nuevo pokemon"
        onClickSi={enviarForm}
        onClickNo={() => setVisibleModalNuevo(false)}
      >
        ¿Estás seguro de crear el nuevo pokemon?
      </Modal>
    </section>
  );
};
export default FormularioPokemon;
