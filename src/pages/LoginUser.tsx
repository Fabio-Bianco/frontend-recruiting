/**
  Contiene:
- Form con email/password
- Chiamata API fake per autenticazione
- Gestione errori login
- Redirect dopo login riuscito
 */

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ se arrivi da una rotta protetta, ti rimanda lì dopo login
  const from = (location.state as any)?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const ok = await login(email, password);
      if (!ok) {
        setErrorMsg("Credenziali non valide.");
        return;
      }
      navigate(from, { replace: true });
    } catch {
      setErrorMsg("Errore durante il login.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", mt: 8 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Login
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {errorMsg && (
            <Typography color="error" variant="body2">
              {errorMsg}
            </Typography>
          )}

          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? "Accesso..." : "Accedi"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
