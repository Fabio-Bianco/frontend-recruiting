import { Drawer, Box, Stack, Typography, Divider, TextField, Button } from "@mui/material";
import type { User } from "../../types/user";
import { createUser, updateUser } from "../../api/users.api";
import { useEffect, useState } from "react"

// Tipo per la modalità del Drawer
type DrawerMode = "create" | "edit";

// Props del componente Drawer
// Questo è il “contratto” tra UsersList (padre) e UsersDrawer (figlio)
interface UsersDrawerProps {
    open: boolean;
    mode: DrawerMode;
    initialUser: User | null;
    onClose: () => void;
    onSaved: (user?: User) => void;
}

export default function UsersDrawer({
    open,
    mode,
    initialUser,
    onClose,
    onSaved,
}: UsersDrawerProps) {


/**
* STATE DEL FORM
*/

const [name, setName] = useState<string>("");
const [email, setEmail] = useState<string>(""); 
const [password, setPassword] = useState<string>("");
const [submitting, setSubmitting] = useState(false);
const [errorMsg, setErrorMsg] = useState<string | null>(null);

// Titolo dinamico in base alla modalità
const title = mode === "create" ? "Nuovo Utente" : "Modifica Utente";

/**
* PREFILL / RESET AUTOMATICO
*/

useEffect(() => {
    setErrorMsg(null);

    if (!open) return;

    if (mode === "edit" && initialUser) {
        setName(initialUser.name);
        setEmail(initialUser.email);
        setPassword(initialUser.password);
    } else {
        setName("");
        setEmail("");
        setPassword("");
    }   
}, [open, mode, initialUser]);  

/**
* FUNZIONE DI SALVATAGGIO
*/


async function handleSubmit() {
    setErrorMsg(null);

    // Validazioni base
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
        setErrorMsg("Tutti i campi sono obbligatori.");
        return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    try {
      setSubmitting(true);

      if (mode === "create") {
        await createUser(payload);
      } else {
        await updateUser(String(initialUser!.id), payload);
      }

      onSaved();
    } catch {
      setErrorMsg("Errore durante il salvataggio.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 420, p: 2 }}>
        {/* Header */}
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
          {mode === "edit"
            ? `Stai modificando l'utente ID: ${initialUser?.id ?? ""}`
            : "Stai creando un nuovo utente."}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Form */}
        <Stack spacing={2}>
          <TextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            type="email"
          />

          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            type="password"
          />

          {/* Messaggio di errore */}
          {errorMsg && (
            <Typography color="error" variant="body2">
              {errorMsg}
            </Typography>
          )}

          {/* Footer con azioni */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={onClose} disabled={submitting}>
              Annulla
            </Button>

            <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Salvataggio..." : "Salva"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}