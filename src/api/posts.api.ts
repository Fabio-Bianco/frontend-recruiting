import { apiClient } from "./client";


// Funzione che recupera tutti i post dal backend
export async function getPosts() {

    // Chiamata HTTP GET verso /posts
  const response = await apiClient.get("/posts");

  //Ritorniamo solo i dati JSON
  return response.data;

}
