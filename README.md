# 🌟 Frontend Recruiting

> *Un progetto che dimostra come costruire una dashboard moderna e funzionale*

Ciao! 👋 Sono **Fabio Bianco** e questo è il mio approccio per creare un'applicazione web che va oltre il semplice esercizio di recruiting. 

Qui troverai una dashboard per la gestione di utenti e post che simula un vero scenario aziendale - perché creare software non è solo scrivere codice, è risolvere problemi reali con eleganza e pragmatismo.

## 💡 Cosa rende speciale questo progetto

**🎯 Stack moderno e consolidato**: React 19, TypeScript, Vite - strumenti che conosci e ami  
**📊 Tabelle intelligenti**: Material React Table con persistenza dello stato (perché nessuno vuole perdere i propri filtri)  
**🔐 Autenticazione realistica**: Login simulato ma strutturato come in produzione  
**🛠 Architettura scalabile**: Pattern e strutture che puoi portare nei tuoi progetti veri

## 🚀 Quick Start - Fai partire tutto in 30 secondi

```bash
# Clona e installa
git clone [repository-url]
cd frontend-recruiting
npm install

# Magic command - avvia tutto insieme
npm run dev:full
```

Boom! 💥 Apri `http://localhost:5173` e sei pronto per esplorare.

**Login di test**: `mario@example.com` / `password123`

## 🧠 Il mio approccio tecnico

### Stack scelto (e perché)
- **React 19** - L'ultima versione per le feature più fresche
- **TypeScript** - Perché il codice deve essere comprensibile anche fra 6 mesi
- **Vite** - Build tool veloce come il pensiero
- **Material UI** - Design system robusto per non reinventare la ruota
- **Material React Table** - Tabelle potenti senza mal di testa
- **Axios** - HTTP client che funziona sempre
- **React Router** - Navigazione SPA come si deve

### Architettura che conta
```
📁 src/
  📁 api/         # Layer di comunicazione pulito
  📁 auth/        # Gestione autenticazione isolata
  📁 components/  # UI componenti riutilizzabili
  📁 pages/       # Viste principali
  📁 types/       # TypeScript types centralizzati
  📁 utils/       # Helper functions
```

## ✨ Cosa funziona già (e cosa manca)

### 🎉 Già in produzione
- **Autenticazione completa** - Login, logout, protezione rotte
- **Dashboard funzionale** - Homepage che accoglie l'utente
- **Gestione Post** - Lista con filtri, sorting, pagination che si ricorda le tue preferenze
- **Dettagli Post** - Pagina dedicata per ogni contenuto
- **Lista Utenti** - Visualizzazione tabellare base
- **Backend simulato** - 20 utenti e 20 post pronti per essere esplorati

### 🚧 Il prossimo passo
- **UsersList con superpoteri** - Persistenza stato come nei Post
- **UserDetail completo** - Visualizzazione post dell'utente
- **CRUD operations** - Create, Update, Delete per tutto
- **Form intelligenti** - React Hook Form + Zod per validazione
- **TanStack Query** - Caching e sincronizzazione dati
- **Zustand** - State management globale

## 🎮 Giocare con il progetto

### Backend fake intelligente
Ho configurato `json-server` per simulare un vero backend REST. Perché? Perché sviluppare frontend senza API è come imparare a nuotare senza acqua.

**Dati di test realistici**:
- 20 utenti con email e password vere
- 20 post collegati agli utenti
- API REST complete e funzionanti

### API che puoi usare subito
```bash
# Tutti gli utenti
GET http://localhost:3001/users

# Un utente specifico
GET http://localhost:3001/users/1

# Post di un utente
GET http://localhost:3001/posts?userId=1

# Creare un post
POST http://localhost:3001/posts
```

### Comandi per sviluppatori
```bash
# Sviluppo frontend
npm run dev

# Backend fake
npm run server

# Tutto insieme (il mio preferito)
npm run dev:full
```

## 🎯 Quello che ho imparato (e che puoi imparare anche tu)

**Material React Table è potentissimo** - Persistenza automatica dello stato, filtri, sorting... tutto pronto all'uso  
**TypeScript rende tutto più semplice** - Meno bug, più fiducia nel refactor  
**Struttura modulare paga sempre** - Ogni feature ha la sua casa  
**Simulare il backend aiuta** - Sviluppi il frontend senza dipendenze esterne

## 🌟 Perché questo approccio

Non ho voluto creare l'ennesimo todo-app. Ho voluto dimostrare che posso:
- **Strutturare** un progetto scalabile
- **Scegliere** gli strumenti giusti per il job
- **Implementare** pattern consolidati e moderni  
- **Pensare** all'esperienza utente (persistenza stato tabelle)
- **Scrivere** codice che altri sviluppatori possono capire e estendere

## 🚀 Test drive

**L'app è live e funzionante**:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3001](http://localhost:3001)
- Zero errori di compilazione ✨

Prova con qualsiasi utente dal file `fake-backend/db.json` o usa `mario@example.com` / `password123`

---

## 💭 Una nota personale

Questo progetto rappresenta il mio approccio allo sviluppo: **pratico, scalabile e umano**.

Non ho voluto impressionare con over-engineering. Ho voluto dimostrare che so:
- Scegliere gli strumenti giusti
- Strutturare codice maintainable  
- Implementare UX che conta (come la persistenza dello stato delle tabelle)
- Scrivere documentazione che aiuta davvero

Se stai leggendo questo README e sei un recruiter: grazie per il tempo. Se sei uno sviluppatore: spero che qualcosa qui ti sia utile per i tuoi progetti! 

---

*Fatto con ❤️ da Fabio Bianco - Gennaio 2026*

> *"Il miglior codice è quello che il tuo futuro io riuscirà ancora a capire"*





