// Importiamo il componente principale della pagina dei post.
// Questo è il componente che vogliamo mostrare quando l’app parte.
import PostsList from "./pages/PostsList";

// App è il componente root dell’applicazione.
// Tutta l’app React parte da qui.
function App() {

    // Qui diciamo: “Quando React renderizza App,
  // deve renderizzare il componente PostsList”.
  return <PostsList />;
}

// Rendiamo App disponibile al resto dell’app (main.tsx lo userà)
export default App;
