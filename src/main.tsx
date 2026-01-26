// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import { AuthProvider } from "./auth/AuthContext";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <App />
        </Container>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
