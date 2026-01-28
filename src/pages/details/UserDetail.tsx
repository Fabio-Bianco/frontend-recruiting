
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, deleteUser } from "../../api/users.api"; // Corretto percorso
import { Box, Button, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import type { User } from "../../types/user";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        const status = (err as any)?.response?.status;
        if (status === 404) {
          setError("Utente non trovato.");
        } else {
          setError("Errore nel caricamento dell'utente.");
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  async function handleDelete() {
    if (!id) return;

    try {
      setDeleting(true);
      await deleteUser(id);
      navigate("/users", { replace: true });
    } catch {
      setError("Errore nella cancellazione dell'utente.");
    } finally {
      setDeleting(false);
      setOpenDeleteDialog(false);
    }
  }

  if (loading) return <Typography>Caricamento...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!user) return <Typography color="error">Utente non trovato.</Typography>;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Dettaglio Utente
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Nome: {user.name}</Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
          Email: {user.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ID: {user.id}
        </Typography>
      </Box>

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/users")}
        >
          Indietro
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setOpenDeleteDialog(true)}
          disabled={deleting}
        >
          {deleting ? "Cancellazione..." : "Cancella Utente"}
        </Button>
      </Stack>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Conferma eliminazione</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sei sicuro di voler eliminare questo utente? Questa azione è irreversibile.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Annulla
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Elimina
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}