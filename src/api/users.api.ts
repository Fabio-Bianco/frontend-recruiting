import { apiClient } from "./client";

// Funzione che recupera tutti gli utenti dal backend
export async function getUsers() {

    // Chiamata HTTP GET verso /users  
  const response = await apiClient.get("/users");
  
  return response.data;
}