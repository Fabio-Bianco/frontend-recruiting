//importazione Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import del componente principale della homepage
import Home from "./pages/Home";

// Import del componente principale della pagina dei post.
import PostsList from "./pages/PostsList";

// Import del componente principale della pagina utenti 
import UsersList from "./pages/UsersList";

// Import del componente della pagina di dettaglio del post
import Navbar from "./components/Navbar";

// Import del componente della pagina di dettaglio del post
import PostsDetails from "./pages/details/PostsDetails";

import { UserDetail } from "./pages/details/UserDeatil";




// App è il componente root dell’applicazione.
// Tutta l’app React parte da qui.
function App() {
  return (

    <BrowserRouter>
  <Navbar />
<Routes>
  <Route path="/" element={<Home />} />

  <Route path="/posts" element={<PostsList />} />
  <Route path="/posts/:id" element={<PostsDetails />} />

  <Route path="/users" element={<UsersList />} />
  <Route path="/users/:id" element={<UserDetail />} />
</Routes>
    </BrowserRouter>

  );
}


// Rendiamo App disponibile al resto dell’app (main.tsx lo userà)
export default App;
