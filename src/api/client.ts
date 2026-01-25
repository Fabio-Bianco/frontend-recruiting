import axios from "axios";

// Istanza axios preconfigurata: tutte le chiamate API useranno questo baseURL
export const apiClient = axios.create({

  // Indirizzo del backend fake (json-server)
  // Tutte le chiamate partiranno da qui:
  baseURL: "http://localhost:3001",
});
