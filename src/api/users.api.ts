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

export async function loginUser(email: string, password: string): Promise<User | null> {
  try {
    // Chiama GET /users?email=xxx&password=yyy (come da traccia)
    const response = await apiClient.get<User[]>("/users", {
      params: { email, password }
    });
    
    // Se trova un utente con email+password corrispondenti, login OK
    const users = response.data;
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    // Se c'è errore di rete o altro, login fallito
    return null;
  }
}