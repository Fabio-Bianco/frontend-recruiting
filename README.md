# Frontend Recruiting

Autore: **Fabio-Bianco**

Dashboard frontend per simulare uno scenario reale di interazione con API REST (backend fake), con gestione di utenti e post in stile gestionale.

---

## 📋 Avanzamento Lavori

### ✅ Completato
- **Struttura base del progetto**: configurato Vite + React + TypeScript
- **Sistema di routing**: implementato React Router con navigazione tra le pagine
- **Navbar**: creata barra di navigazione semplice con link a Dashboard, Posts e Users
- **Homepage/Dashboard**: pagina di benvenuto
- **Lista Post**: pagina che mostra tutti i post recuperati dal backend fake
- **Dettaglio Post**: pagina che mostra i dettagli di un singolo post (con gestione errori 404)
- **Lista Utenti**: pagina che mostra tutti gli utenti con nome ed email
- **Dettaglio Utente**: creata la pagina (da implementare completamente)
- **API Layer**: configurato Axios e creati i file API per posts e users
- **Types**: definiti i tipi TypeScript per Post e User
- **Backend fake**: configurato json-server sulla porta 3001

### 🚧 In corso / Da fare
- Completare la pagina di dettaglio utente
- Implementare il CRUD completo per post e utenti (create, update, delete)
- Integrare Material UI per l'interfaccia
- Aggiungere Material React Table con paginazione, filtri e ordinamento
- Implementare la gestione dello stato con Zustand
- Aggiungere form con React Hook Form e validazione con Zod
- Integrare TanStack Query per il caching e la gestione delle chiamate API
- Sistema di autenticazione fake

---

## 🛠 Stack Tecnologico
- **Framework**: React 19 + Vite + TypeScript
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **UI Components**: Material UI (da integrare)
- **Tabelle**: Material React Table (da integrare)
- **State Management**: Zustand (da integrare)
- **Form Management**: React Hook Form + Zod (da integrare)
- **Data Fetching**: TanStack Query (da integrare)  

---

## 🧪 Backend fake
Il progetto utilizza **json-server** per simulare un backend REST.

(Terminale 1)

```bash
npx json-server --watch fake-backend/db.json --port 3001
```


## 🚀 Frontend
Avviare l'applicazione React:

(Terminale 2)

```bash
npm run dev
```





