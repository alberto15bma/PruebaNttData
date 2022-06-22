
import { BrowserRouter} from "react-router-dom";
import BarraBusqueda from "./components/BarraBusqueda";
import TablaPokemon from "./components/TablaPokemon";
import { PokemonProvider } from "./context/PokemonContext";
import Rutas from "./sistema/Rutas";

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <PokemonProvider>
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
