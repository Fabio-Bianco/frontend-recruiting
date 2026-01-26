// src/main.tsx

// Punto di ingresso principale dell’applicazione React.
import { StrictMode } from 'react'

// Import del metodo createRoot per il rendering dell’app
import { createRoot } from 'react-dom/client'

// Import dei componenti di Material UI per lo stile globale e il layout
import CssBaseline from "@mui/material/CssBaseline";

// Import del componente principale dell’app
import Container from "@mui/material/Container";

// Import del componente App
import App from './App.tsx'

// Creazione del root e rendering dell’app all’interno dell’elemento con id 'root'
createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <CssBaseline />
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <App />
    </Container>
  </StrictMode>
)
