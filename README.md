# Frontend Recruiting

Autore: **Fabio-Bianco**

Dashboard frontend per simulare uno scenario reale di interazione con API REST (backend fake), con gestione di utenti e post in stile gestionale.

---

## 📋 Avanzamento Lavori

### ✅ Completato
- **Struttura base del progetto**: configurato Vite + React + TypeScript
- **Sistema di routing**: implementato React Router con navigazione tra le pagine e protezione auth
- **Autenticazione completa**: login fake con sessionStorage, logout funzionante, protezione rotte
- **Navbar**: barra di navigazione con logout e navigazione tra sezioni
- **Homepage/Dashboard**: pagina di benvenuto
- **Lista Post**: Material React Table con persistenza completa (pagination + sorting + filters + globalFilter)
- **Dettaglio Post**: pagina che mostra i dettagli di un singolo post (con gestione errori 404)
- **Lista Utenti**: pagina con Material React Table (da aggiornare con persistenza)
- **API Layer**: configurato Axios e creati i file API per posts e users con login
- **Types**: definiti i tipi TypeScript per Post e User
- **Backend fake**: json-server configurato e funzionante sulla porta 3001 con 20 utenti e 20 post
- **Storage utilities**: funzioni helper per sessionStorage
- **Import fixing**: risolti tutti i problemi di naming e import

### 🚧 In corso / Da fare
- **UsersList**: aggiornare con persistenza completa come PostsList
- **UserDetail**: completare con visualizzazione post dell'utente
- **CRUD completo**: implementare create, update, delete per post e utenti
- **Form management**: React Hook Form + Zod per form di creazione/modifica
- **Drawer/Modal**: interfacce per CRUD operations
- **TanStack Query**: implementare per caching e gestione API calls
- **Zustand**: state management globale
- **UI/UX**: miglioramenti styling e user experience

---

## 🛠 Stack Tecnologico
- **Framework**: React 19 + Vite + TypeScript ✅
- **Routing**: React Router DOM ✅
- **HTTP Client**: Axios ✅
- **UI Components**: Material UI ✅
- **Tabelle**: Material React Table ✅ (PostsList completa, UsersList da aggiornare)
- **Auth**: SessionStorage ✅
- **State Management**: Zustand ⏳ (installato, da implementare)
- **Form Management**: React Hook Form + Zod ⏳ (installato, da implementare)
- **Data Fetching**: TanStack Query ⏳ (installato, da implementare)

---

## 🧪 Backend fake
Il progetto utilizza **json-server** per simulare un backend REST.

### Avvio del progetto
```bash
# Installazione dipendenze
npm install

# Avvio server di sviluppo (porta 5173)
npm run dev

# Avvio backend fake (porta 3001)
npm run server

# Avvio completo (dev + server insieme)
npm run dev:full
```

### Database di test
- **20 utenti** con credenziali email/password
- **20 post** associati agli utenti
- **Login di test**: `mario@example.com` / `password123`

### API disponibili
```
GET    /users
GET    /users/:id
GET    /posts
GET    /posts/:id
GET    /posts?userId=1
POST   /posts
PUT    /posts/:id
DELETE /posts/:id
```

Base URL: `http://localhost:3001`

### Login simulato
```
GET /users?email=mario@example.com&password=password123
```

---

## 🎯 Stato implementazione features

### ✅ Autenticazione
- [x] Pagina login con form
- [x] API call fake per login
- [x] SessionStorage per persistenza
- [x] Protezione rotte con RequireAuth
- [x] Logout funzionante
- [x] Redirect dopo login

### ✅ Posts Management  
- [x] Lista post con Material React Table
- [x] Persistenza stato tabella (pagination, sorting, filters)
- [x] Navigazione verso dettaglio
- [x] Visualizzazione dettaglio post
- [ ] CRUD operations (create, update, delete)
- [ ] Form con validazione

### 🚧 Users Management
- [x] Lista utenti con Material React Table basic
- [x] Navigazione verso dettaglio utente
- [ ] Persistenza stato tabella completa
- [ ] Visualizzazione post dell'utente nel dettaglio
- [ ] CRUD operations (create, update, delete)
- [ ] Form con validazione

### ⏳ Advanced Features
- [ ] TanStack Query per caching API
- [ ] Zustand per state management
- [ ] Form con React Hook Form + Zod
- [ ] Drawer/Modal per CRUD
- [ ] Error boundaries
- [ ] Loading states avanzati

---

## 🚀 Deployment & Test

L'applicazione è **funzionante** e testabile:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Status**: Nessun errore di compilazione
- **Login test**: Utilizza qualsiasi utente dal file `fake-backend/db.json`

---

## 📤 Consegna
Il candidato dovrà fornire:
- [x] Repository GitHub pubblico o privato
- [x] README con istruzioni per l'avvio del progetto
- [x] Codice funzionante e avviabile
- [ ] Implementazione completa di tutti i requisiti

**Target consegna**: 29 gennaio 2026

---

*Ultimo aggiornamento*: 26 gennaio 2026, ore 23:30

(Terminale 1)

```bash
npm run server
```


## 🚀 Frontend
Avviare l'applicazione React:

(Terminale 2)

```bash
npm run dev
```





