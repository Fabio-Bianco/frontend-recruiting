import { Drawer, Box, Stack, Typography, Button } from "@mui/material";
import type { Post } from "../../types/post";

type DrawerMode = "create" | "edit";

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

    


    const title = mode === "create" ? "Nuovo Post" : "Modifica Post"; 
    
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 420, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {mode === "edit"
            ? `Stai modificando il post ID: ${initialPost?.id ?? ""}`
            : "Stai creando un nuovo post."}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={onClose}>
            Annulla
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              // placeholder: nel prossimo step sarà handleSubmit()
              onSaved();
            }}
          >
            Salva
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}