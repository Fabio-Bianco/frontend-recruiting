import { useEffect, useState } from "react";
import { getPosts } from "../api/posts.api";
import type { Post } from "../types/post";

// Questo componente rappresenta la pagina che mostra la lista dei post
export default function PostsList() {

  // Stato che contiene i post ricevuti dal backend
  const [posts, setPosts] = useState<Post[]>([]);

  // Stato che indica se stiamo ancora caricando i dati
  const [loading, setLoading] = useState(true);

  // useEffect viene eseguito una sola volta quando il componente viene montato
  useEffect(() => {
    // Funzione asincrona che carica i post
    async function loadPosts() {
      // Recuperiamo i dati dal backend
      const data = await getPosts();

      // Salviamo i post nello stato
      setPosts(data);

      // Disattiviamo il loading
      setLoading(false);
    }

    // Avviamo il caricamento
    loadPosts();
  }, []);

  // Finché i dati non sono pronti mostriamo un messaggio di caricamento
  if (loading) {
    return <p>Caricamento...</p>;
  }

  // Quando i dati sono disponibili, renderizziamo la lista
  return (
    <div>
      <h1>Lista Post</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <br />
            <small>User ID: {post.userId}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
