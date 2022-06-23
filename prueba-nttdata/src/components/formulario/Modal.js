import React from 'react';
import '../../estilos/modal.scss'
import InputButton from './InputButton';

const Modal = ({
  children,
  titulo = "",
  visible = false,
  onClickSi,
  onClickNo,
}) => {
  return (
    <div className={`modal ${visible && "modal__open"} `}>
      <section className="modal__contenido">
        <div className="modal__contenido__header">
          <span className="modal__contenido__header__titulo">{titulo}</span>
          <button onClick={onClickNo}>&times;</button>
        </div>
        <div className="modal__contenido__body">{children}</div>
        <div className="modal__contenido__boton">
          <InputButton value="Si" onClick={onClickSi} />
          <span className="modal__contenido__boton-espacio"></span>
          <InputButton
            value="No"
            estilos={{ background: "#999" }}
            onClick={onClickNo}
          />
        </div>
      </section>
    </div>
  );
};

export default Modal;