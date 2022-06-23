
import { BrowserRouter} from "react-router-dom";
import BarraBusqueda from "./components/BarraBusqueda";
import Notificacion from "./components/notificacion/Notificacion";
import TablaPokemon from "./components/TablaPokemon";
import { PokemonProvider } from "./context/PokemonContext";
import Rutas from "./sistema/Rutas";

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <PokemonProvider>
            <Notificacion />
            <BarraBusqueda />
            <TablaPokemon />
              <Rutas />
          </PokemonProvider>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
