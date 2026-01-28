
import { useEffect, useState } from "react";
import {Link as RouterLink} from "react-router-dom";
import { getPostsByUserId } from "../../api/posts.api";
import type { Post } from "../../types/post";
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
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);
  
  
  
  
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


  useEffect(() => {
    async function loadUserPosts() {
      if (!id) return;

      // id da useParams è string → la convertiamo a number

      const userIdNum = Number(id);

      if (Number.isNaN(userIdNum))
        return;

      setPostsLoading(true);
      setPostsError(null);

      try {
        const posts = await getPostsByUserId(userIdNum);
        setUserPosts(posts);
      } catch (err) {
        setPostsError("Errore nel caricamento dei post.");
      } finally {
        setPostsLoading(false);
      }
    }

    loadUserPosts();
}, [id]);

  if (loading) return <Typography>Caricamento...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!user) return <Typography color="error">Utente non trovato.</Typography>;

   return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Dettaglio Utente
      </Typography>

      {/* Dati utente */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Nome: {user.name}</Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
          Email: {user.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ID: {user.id}
        </Typography>
      </Box>

      {/* Relazione: posts dell'utente */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Posts dell'utente
        </Typography>

        {postsLoading && <Typography>Caricamento post...</Typography>}

        {postsError && (
          <Typography color="error" sx={{ mb: 1 }}>
            {postsError}
          </Typography>
        )}

        {!postsLoading && !postsError && userPosts.length === 0 && (
          <Typography color="text.secondary">
            Nessun post associato a questo utente.
          </Typography>
        )}

        {!postsLoading && !postsError && userPosts.length > 0 && (
          <Stack spacing={1} sx={{ mt: 1 }}>
            {userPosts.map((p) => (
              <Box
                key={p.id}
                sx={{
                  p: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                  {p.title}
                </Typography>

                <Button
                  component={RouterLink}
                  to={`/posts/${p.id}`}
                  size="small"
                  variant="outlined"
                >
                  Apri post
                </Button>
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      {/* Azioni */}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
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

      {/* Dialog conferma delete */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Conferma eliminazione</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sei sicuro di voler eliminare questo utente? Questa azione è irreversibile.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>
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