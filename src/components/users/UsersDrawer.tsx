import { Drawer, Box, Stack, Typography, Button, TextField } from "@mui/material";
import type { User } from "../../types/user";
import { createUser, updateUser } from "../../api/users.api";
import { useEffect, useState } from "react";

type DrawerMode = "create" | "edit";

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
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const title = mode === "create" ? "Nuovo Utente" : "Modifica Utente";

  useEffect(() => {
    if (!open) return;

    if (mode === "create") {
      setName("");
      setEmail("");
      setPassword("");
    } else if (initialUser) {
      setName(initialUser.name);
      setEmail(initialUser.email);
      setPassword(initialUser.password);
    }
  }, [open, mode, initialUser]);

  async function handleSubmit() {
    if (!name || !email || !password) return;

    setSubmitting(true);
    try {
      const payload = { name, email, password };

      if (mode === "create") {
        await createUser(payload);
      } else {
        await updateUser(String(initialUser!.id), payload);
      }

      onSaved();
    } catch {
      // Errori ignorati per semplicità
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {title}
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
          />

          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            fullWidth
          />

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button onClick={onClose} disabled={submitting}>
              Annulla
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmit} 
              disabled={submitting}
            >
              {submitting ? "Salvando..." : "Salva"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}