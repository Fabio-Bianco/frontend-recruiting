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

// Import dei tipi di Material React Table
import type { MRT_ColumnDef } from "material-react-table";

import type {
  MRT_ColumnFilterFnsState,
  MRT_PaginationState,
  MRT_SortingState,
} from "material-react-table";



// Questo componente rappresenta la pagina che mostra la lista dei post
export default function PostsList() {

  // -----------------------------
  // 1) DATA (i post dal backend)
  // -----------------------------

  // Stato che contiene i post ricevuti dal backend
  const [posts, setPosts] = useState<Post[]>([]);
  // Stato per il caricamento
  const [loading, setLoading] = useState(true);


  // -----------------------------
  // 2) TABLE STATE (stato tabella)
  // -----------------------------






  // -----------------------------
  // 3) LOAD DATA (fetch posts)
  // -----------------------------

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

  // Definizione delle colonne per Material React Table
  //MRT_ColumnDef<Post> tipizza columns come la colonna dei post
  const columns: MRT_ColumnDef<Post>[] = [
    { accessorKey: "title", header: "Titolo" },
    { accessorKey: "userId", header: "User ID" },
    {
      header: "Dettagli",
      Cell: ({ row }) => <Link to={`/posts/${row.original.id}`}>Dettagli</Link>,
    },
  ];

  //row.original.id accede all'id del post originale

  // Quando i dati sono disponibili, renderizziamo la lista
  return (
    <div>
      <h1>Lista Post</h1>
      <MaterialReactTable columns={columns} data={posts} />
    </div>
  );
}
