# Frontend Recruiting

Autore: **Fabio-Bianco**

Dashboard frontend per simulare uno scenario reale di interazione con API REST (backend fake), con gestione di utenti e post in stile gestionale.

---

## 🎯 Obiettivo
Realizzare una piccola applicazione React che permetta di:
- visualizzare dati da API REST
- creare, modificare ed eliminare entità
- gestire stato applicativo e navigazione
- usare tabelle avanzate per la visualizzazione strutturata dei dati

Progetto pensato come esercizio pratico su architettura frontend moderna.

---

## 🧩 Funzionalità principali
- Autenticazione fake
- Gestione Post (CRUD)
- Gestione Utenti (CRUD)
- Tabelle con:
  - paginazione
  - filtri
  - ordinamento
  - stato preservato tra navigazioni
- Navigazione tra lista e dettaglio

---

## 🛠 Stack
- React + Vite  
- TypeScript  
- Material UI  
- Material React Table  

Librerie di supporto:
- Axios  
- TanStack Query  
- React Router  
- Zustand  
- React Hook Form  
- Zod  

---

## 🧪 Backend fake
Il progetto utilizza **json-server** per simulare un backend REST.

```bash
npx json-server --watch fake-backend/db.json --port 3001
```
(Terminale 1)

## 🚀 Frontend
Avviare l'applicazione React:

```bash
npm run dev
```
(Terminale 2)




