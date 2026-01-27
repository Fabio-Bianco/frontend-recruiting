import { apiClient } from "./client";
import type { User } from "../types/user";

// Funzione che recupera tutti gli utenti dal backend
export async function getUsers(): Promise<User[]> {
  const response = await apiClient.get<User[]>("/users"); // Chiamata HTTP GET verso /users 
  return response.data;
}

// Funzione che recupera un singolo user dato il suo ID
export async function getUserById(id: string): Promise<User> {
  const { data } = await apiClient.get<User>(`/users/${id}`);
  return data;
}

// Funzione che crea un nuovo utente
export async function createUser(userPayload: Omit<User, "id">): Promise<User> {
  const response = await apiClient.post<User>("/users", userPayload);
  return response.data;
};

// Funzione che aggiorna un utente esistente  
export async function updateUser(id: string, userPayload: Omit<User, "id">): Promise<User> {
  const response = await apiClient.put<User>(`/users/${id}`, userPayload);
  return response.data;
};

// Funzione che elimina un utente dato il suo ID
export async function deleteUser(id: string): Promise<void> {
  await apiClient.delete<void>(`/users/${id}`);
};




// Funzione per il login dell'utente
export async function loginUser(email: string, password: string): Promise<User | null> {
  try {
    // Chiama GET /users?email=xxx&password=yyy per verificare le credenziali
    const response = await apiClient.get<User[]>("/users", {
      params: { email, password }
    });
    
    // Se trova un utente con email+password corrispondenti, login OK
    const users = response.data;
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    return null;  // Se c'è errore di rete o altro, login fallito
  }
}