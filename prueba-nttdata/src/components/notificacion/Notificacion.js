import { useContext, useEffect } from "react";
import PokemonContext from "../../context/PokemonContext";
import dataNotificacion from "../../modelos/notificacion";

let tipoNotify = {
  error: "content__notificacion__error",
  alert: "content__notificacion__alert",
  exito: "content__notificacion__exito",
};
const Notificacion = () => {
    const { notificacion, mostrarNotificacion } = useContext(PokemonContext);

  useEffect(() => {
    setTimeout(() => {
      mostrarNotificacion(dataNotificacion);
    }, 6000);
  }, [notificacion]);

  let clases = "content__notificacion " + tipoNotify[notificacion.tipo];

  return (
    <>
      {notificacion.visible === true ? (
        <div className={clases}>
          <span>{notificacion.mensaje}</span>
          <span
            className="content__notificacion__cerrar"
            onClick={() => mostrarNotificacion(dataNotificacion)}
          >
            &times;
          </span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Notificacion;