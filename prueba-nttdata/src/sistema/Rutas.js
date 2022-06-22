import { useRoutes } from "react-router-dom";
import FormularioPokemon from "../components/FormularioPokemon";

const Rutas = () => {
  let routes = useRoutes([
    { path: "agregar",    element: <FormularioPokemon editar={false} /> },
    { path: "editar/:id", element: <FormularioPokemon editar={true} /> },
  ]);
  return routes;
};

export default Rutas;