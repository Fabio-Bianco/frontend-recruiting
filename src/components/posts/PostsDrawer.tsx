import { Drawer, Box, Stack, Typography, Button, TextField } from "@mui/material";
import type { Post } from "../../types/post";
import { createPost, updatePost } from "../../api/posts.api";
import { useEffect, useState } from "react";

type DrawerMode = "create" | "edit";

interface PostsDrawerProps {
  open: boolean;
  mode: DrawerMode;
  initialPost: Post | null;
  onClose: () => void;
  onSaved: (post?: Post) => void;
}

export default function PostsDrawer({
  open,
  mode,
  initialPost,
  onClose,
  onSaved,
}: PostsDrawerProps) {
  const [userId, setUserId] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const title = mode === "create" ? "Nuovo Post" : "Modifica Post";

  useEffect(() => {
    if (!open) return;

    if (mode === "create") {
      setUserId("");
      setPostTitle("");
      setContent("");
    } else if (initialPost) {
      setUserId(String(initialPost.userId));
      setPostTitle(initialPost.title);
      setContent(initialPost.content);
    }
  }, [open, mode, initialPost]);

  async function handleSubmit() {
    if (!userId || !postTitle || !content) return;

    setSubmitting(true);
    try {
      const payload = {
        userId: Number(userId),
        title: postTitle,
        content: content,
        createdAt: mode === "create" ? new Date().toISOString() : initialPost!.createdAt,
      };

      if (mode === "create") {
        await createPost(payload);
      } else {
        await updatePost(String(initialPost!.id), payload);
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
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            type="number"
            fullWidth
          />

          <TextField
            label="Titolo"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Contenuto"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={4}
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