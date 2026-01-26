// Importiamo il componente principale della pagina dei post.
import PostsList from "./pages/PostsList";

// Importiamo anche il componente della pagina utenti 
import UsersList from "./pages/UsersList";

//importazione Router
import { BrowserRouter } from "react-router-dom";




// App è il componente root dell’applicazione.
// Tutta l’app React parte da qui.
function App() {
  return (

      <BrowserRouter>
        <PostsList />
        <UsersList />
      </BrowserRouter>

  );
}


// Rendiamo App disponibile al resto dell’app (main.tsx lo userà)
export default App;
