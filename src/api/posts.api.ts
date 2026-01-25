import { apiClient } from "./client";
import type { Post } from "../types/post";

// Funzione che recupera tutti i post dal backend
export async function getPosts(): Promise<Post[]> {

    // Chiamata HTTP GET verso /posts
  const response = await apiClient.get<Post[]>("/posts");

  //Ritorniamo solo i dati JSON
  return response.data;

}
