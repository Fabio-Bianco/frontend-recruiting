// Importiamo il componente principale della pagina dei post.
// Questo è il componente che vogliamo mostrare quando l’app parte.
import PostsList from "./pages/PostsList";

// Importiamo anche il componente della pagina utenti 
import UsersList from "./pages/UsersList";

// App è il componente root dell’applicazione.
// Tutta l’app React parte da qui.
function App() {
  return (
    <div>
      <PostsList />
      <UsersList />
    </div>
  );
}


// Rendiamo App disponibile al resto dell’app (main.tsx lo userà)
export default App;
