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
//Modalità stretta di React per evidenziare potenziali problemi
  <StrictMode> 

    // Reset dello stile di base di Material UI
    <CssBaseline /> 

    // Contenitore principale dell’app con larghezza massima 'lg' e padding verticale
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <App />
    </Container>
  </StrictMode>
)
