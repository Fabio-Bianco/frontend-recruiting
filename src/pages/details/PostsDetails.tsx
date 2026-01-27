import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost } from "../../api/posts.api";
import { Box, Button, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Post } from "../../types/post";


export default function PostsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // stato per controllare il dialog
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {

        const status = (err as any)?.response?.status;
        if (status === 404) {

          setError("Post non trovato.");

        } else {

          setError("Errore nel caricamento del post.");
        }
        setPost(null);

      } finally {

        setLoading(false);
      }
    }

    loadPost();
  }, [id]);


  // funzione di cancellazione post
  async function handleDelete() {
    if (!id) return;

    try {
      setDeleting(true);
      await deletePost(id);
      navigate("/posts", { replace: true });
    } catch {
      setError("Errore nella cancellazione del post.");
    } finally {
      setDeleting(false);
      setOpenDeleteDialog(false); // chiudi il dialog dopo l'eliminazione
    }
  }

if (loading) return <Typography>Caricamento...</Typography>;
if (error) return <Typography color="error">{error}</Typography>;
if (!post) return <Typography color="error">Post non trovato.</Typography>;


  return (
    
     <Box> 
      <Typography variant="h4" sx={{ mb: 2 }}>
        Dettaglio Post
      </Typography>

      
    <Box sx={{ mb: 2 }}>

      <Typography variant="h6">Titolo: {post.title}</Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>Contenuto: {post.content}</Typography>
      <Typography variant="body2" color="textSecondary">
        Creato il: {post.createdAt}
      </Typography>
    </Box>

    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/posts")}
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
        {deleting ? "Cancellazione..." : "Cancella Post"}
      </Button>
    </Stack>

    <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
      <DialogTitle>Conferma eliminazione</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sei sicuro di voler eliminare questo post? Questa azione è irreversibile.
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
