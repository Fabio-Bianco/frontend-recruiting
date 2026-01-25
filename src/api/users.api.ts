import { apiClient } from "./client";
import type { User } from "../types/user";

// Funzione che recupera tutti gli utenti dal backend
export async function getUsers(): Promise<User[]> {

    // Chiamata HTTP GET verso /users  
  const response = await apiClient.get<User[]>("/users");
  
  return response.data;
}