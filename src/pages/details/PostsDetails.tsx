import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost } from "../../api/posts.api";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Post } from "../../types/post";


export default function PostsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
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


  //funzione di cancellazione post

  async function handleDelete() {

    if (!id) return;

    const confirmed = window.confirm("Sei sicuro di voler cancellare questo post?");
    if (!confirmed) return;

    try {
      setDeleting(true);
      await deletePost(id);
      navigate("/posts", { replace: true });
    }catch {
      setError("Errore nella cancellazione del post.");
    } finally {
      setDeleting(false);
    }
  };

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
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? "Cancellazione..." : "Cancella Post"}
      </Button>
    </Stack>


     </Box>
  );
}
