import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthContext";

// Componente principale per la pagina di login
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);


  // Gestisce il submit del form di login 
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);

    const ok = await login(email, password);

    if (ok) {
      navigate("/");
    }
    
    setSubmitting(false);
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Login
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? "Accesso..." : "Accedi"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
