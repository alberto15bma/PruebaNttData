const InputButton = ({
  value = "",
  icono = null,
  onClick = null,
  clases = "",
  refer = null,
  estilos = null
}) => {
  let cls = "frm__boton " + clases;
  return (
    <button className={cls} onClick={onClick} ref={refer} style={estilos}>
      {icono}
      <span>{value}</span>
    </button>
  );
};
export default InputButton;
