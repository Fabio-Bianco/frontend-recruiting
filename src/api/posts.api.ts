import { apiClient } from "./client";
import type { Post } from "../types/post";

// Funzione che recupera tutti i post dal backend
export async function getPosts(): Promise<Post[]> {
    // Chiamata HTTP GET verso /posts
  const response = await apiClient.get<Post[]>("/posts");
  //Ritorniamo solo i dati JSON
  return response.data;

}

// Funzione che recupera un singolo post dato il suo ID
export async function getPostById(id: string): Promise<Post> {
  const { data } = await apiClient.get<Post>(`/posts/${id}`);
  return data;
}


// Funzione che cancella un post dato il suo ID
// Nota: id è string perché lo passiamo direttamente da useParams.
// JSON-server accetta comunque /posts/1 come URL string.

export async function deletePost(id: string): Promise<void> {
  await apiClient.delete(`/posts/${id}`);
};

// Funzione che crea un nuovo post
export async function createPost(){};

// Funzione che aggiorna un post esistente
export async function updatePost(){};
