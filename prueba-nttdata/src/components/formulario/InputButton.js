const InputButton = ({
  value = "",
  icono = null,
  onClick = null,
  clases = "",
  refer = null
}) => {
  let cls = "frm__boton " + clases;
  return (
    <button className={cls} onClick={onClick} ref={refer}>
      {icono}
      <span>{value}</span>
    </button>
  );
};
export default InputButton;
