import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <App />
    </Container>
  </StrictMode>
)
