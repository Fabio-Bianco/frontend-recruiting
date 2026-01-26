import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/posts.api";
import type { Post } from "../types/post";


export default function PostsDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function loadPost() {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getPostById(id);
      setPost(data);
    } catch (err) {
      setError("Errore nel caricamento del post.");
      setPost(null);
    } finally {
      setLoading(false);
    }
  }

  loadPost();
}, [id]);

  if (!post) return <p>Caricamento...</p>;

  return (
    <div>
      <h1>Pagina di dettaglio del post</h1>
      <p>ID del post: {id}</p>
      <p>Titolo: {post.title}</p>
      <p>Contenuto: {post.content}</p>
      <small>Creato il: {post.createdAt}</small>
    </div>
  );
}
