import { Drawer, Box, Stack, Typography, Button, Divider, TextField } from "@mui/material";
import type { Post } from "../../types/post";
import { createPost, updatePost } from "../../api/posts.api";
import { useEffect, useState } from "react";

type DrawerMode = "create" | "edit";

// Props del componente Drawer
// Questo è il “contratto” tra PostsList (padre) e PostsDrawer (figlio)
interface PostsDrawerProps {
  open: boolean;
  mode: DrawerMode;
  initialPost: Post | null;
  onClose: () => void;
  onSaved: (post?: Post) => void;
}
// Componente Drawer per creare/modificare un Post
export default function PostsDrawer({
    open,
    mode,
    initialPost,
    onClose,
    onSaved,
}: PostsDrawerProps) {

      /**
   * ===========================
   * STATE DEL FORM
   * ===========================
   * Ogni campo è controllato da React.
   * UserId è string perché TextField lavora sempre con stringhe.
   */

    const [userId, setUserId] = useState<string>("");
const [postTitle, setPostTitle] = useState<string>("");
const [content, setContent] = useState<string>("");

  /**
   * Stato di UI:
   * - submitting: blocca i bottoni mentre salva
   * - errorMsg: mostra errori nel Drawer
   */

const [submitting, setSubmitting] = useState(false);
const [errorMsg, setErrorMsg] = useState<string | null>(null);


// Titolo dinamico in base alla modalità
    const title = mode === "create" ? "Nuovo Post" : "Modifica Post"; 

/**
   * ===========================
   * PREFILL / RESET AUTOMATICO
   * ===========================
   * Ogni volta che:
   * - si apre il Drawer
   * - cambia la modalità
   * - cambia il post iniziale
   *
   * Decidiamo:
   * - create → form vuoto
   * - edit   → form precompilato
   */



    useEffect(() => {
  setErrorMsg(null);

  if (!open) return;

  if (mode === "create") {
    setUserId("");
    setPostTitle("");
    setContent("");
    return;
  }

  if (initialPost) {
    setUserId(String(initialPost.userId));
    setPostTitle(initialPost.title);
    setContent(initialPost.content);
  }
}, [open, mode, initialPost]);

  /**
   * ===========================
   * SUBMIT DEL FORM
   * ===========================
   * Decide se chiamare:
   * - createPost (POST)
   * - updatePost (PUT)
   * in base alla modalità
   */

  async function handleSubmit() {
    setErrorMsg(null);

    //validazione minima
    const userIdNumber = Number(userId);
    if (!userIdNumber || Number.isNaN(userIdNumber)) {
      setErrorMsg("UserId deve essere un numero valido.");
      return;
    }
    if (!postTitle.trim() || !content.trim()) {
      setErrorMsg("Tutti i campi sono obbligatori.");
      return;
    }
    if (mode === "edit" && !initialPost) {
      setErrorMsg("Nessun post selezionato per la modifica.");
      return;
    }
   // Payload comune a create/edit
   const payload = {
    userId: userIdNumber,
    title: postTitle.trim(),
    content: content.trim(),
    createdAt: mode === "create" ? new Date().toISOString() : initialPost!.createdAt,
   };

   try {
    setSubmitting(true);

    let savedPost: Post;

    if (mode === "create") {
      savedPost = await createPost(payload);
    } else {
      savedPost = await updatePost(String(initialPost!.id), payload);
    }
     // Comunica al padre che il salvataggio è riuscito
      onSaved(savedPost);

          } catch {
      setErrorMsg("Errore durante il salvataggio.");
    } finally {
      setSubmitting(false);
    }
  }

  /**
   * ===========================
   * RENDER DEL DRAWER
   * ===========================
   */
    return (
         <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 420, p: 2 }}>

        {/* Header */}
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
          {mode === "edit"
            ? `Stai modificando il post ID: ${initialPost?.id ?? ""}`
            : "Stai creando un nuovo post."}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Form */}
        <Stack spacing={2}>
          <TextField
            label="UserId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            inputMode="numeric"
            fullWidth
          />

          <TextField
            label="Titolo"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Contenuto"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            fullWidth
            multiline
            minRows={5}
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