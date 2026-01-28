import { apiClient } from "./client";
import type { Post } from "../types/post";

export type PostPayload = {
  userId: number;
  title: string;
  content: string;
  createdAt: string;
};

// Funzione che recupera tutti i post dal backend
export async function getPosts(): Promise<Post[]> {
  const response = await apiClient.get<Post[]>("/posts");
  return response.data;

}

// Funzione che recupera un singolo post dato il suo ID
export async function getPostById(id: string): Promise<Post> {
  const { data } = await apiClient.get<Post>(`/posts/${id}`);
  return data;
}

/**
 * GET /posts?userId=...
 * Torna tutti i post associati a un utente specifico.
 */


export async function getPostsByUserId (userId: number): Promise<Post[]> {
const {data} = await apiClient.get<Post[]>("/posts", {
    params: { userId }
  });
  return data;
}


// Funzione che cancella un post dato il suo ID
// Nota: id è string perché lo passiamo direttamente da useParams.
// JSON-server accetta comunque /posts/1 come URL string.

export async function deletePost(id: string): Promise<void> {
  await apiClient.delete(`/posts/${id}`);
};

// Funzione che crea un nuovo post
export async function createPost(payload: PostPayload): Promise<Post> {
  const {data} = await apiClient.post<Post>("/posts", payload);
  return data;
}

// Funzione che aggiorna un post esistente
export async function updatePost(id: string, payload: PostPayload): Promise<Post> {
  const {data} = await apiClient.put<Post>(`/posts/${id}`, payload);
  return data;
}