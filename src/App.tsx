// Importiamo il componente principale della homepage
import Navbar from "./components/Navbar";
import Home from "./pages/Home";


// Importiamo il componente principale della pagina dei post.
import PostsList from "./pages/PostsList";

// Importiamo anche il componente della pagina utenti 
import UsersList from "./pages/UsersList";


//importazione Router
import { BrowserRouter, Routes, Route } from "react-router-dom";




// App è il componente root dell’applicazione.
// Tutta l’app React parte da qui.
function App() {
  return (

    <BrowserRouter>
  <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </BrowserRouter>

  );
}


// Rendiamo App disponibile al resto dell’app (main.tsx lo userà)
export default App;
