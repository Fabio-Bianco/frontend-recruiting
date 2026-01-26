import { apiClient } from "./client";
import type { User } from "../types/user";

// Funzione che recupera tutti gli utenti dal backend
export async function getUsers(): Promise<User[]> {

    // Chiamata HTTP GET verso /users  
  const response = await apiClient.get<User[]>("/users");
  
  return response.data;
}

// Funzione che recupera un singolo post dato il suo ID
export async function getUserById(id: string): Promise<User> {
  const { data } = await apiClient.get<User>(`/users/${id}`);
  return data;
}
