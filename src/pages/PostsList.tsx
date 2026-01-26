//import React e gli hook necessari
import { useEffect, useState } from "react";

//import Material React Table
import { MaterialReactTable } from "material-react-table";

// Import della funzione che recupera i post dal backend
import { getPosts } from "../api/posts.api";

// Import del tipo Post
import type { Post } from "../types/post";

// Import del componente Link per la navigazione
import { Link } from "react-router-dom";



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

  const columns = [
    { accessorKey: "title", header: "Titolo" },
    { accessorKey: "userId", header: "User ID" },
    {
      header: "Dettagli",
      Cell: ({ row }: any) => <Link to={`/posts/${row.original.id}`}>Apri</Link>,
    },
  ];


  // Quando i dati sono disponibili, renderizziamo la lista
  return (
    <div>
      <h1>Lista Post</h1>
      <MaterialReactTable columns={columns} data={posts} />
    </div>
  );
}
