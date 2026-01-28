// src/components/posts/posts.colums.tsx

import {Stack, Button, } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { MRT_ColumnDef } from "material-react-table";
import type { Post } from "../../types/post";


type PostColumns = {
    // Funzione chiamata quando si clicca su "Modifica" in una riga
    onEdit: (post: Post) => void;
};

export function getPostsColumns({
  onEdit,
}: PostColumns): MRT_ColumnDef<Post>[] {
  return [
    {
      header: "ID",
      accessorKey: "id",
      size: 80,
    },
    {
      header: "Titolo",
      accessorKey: "title",
    },
    {
      header: "UserId",
      accessorKey: "userId",
      size: 90,
    },
    {
      header: "Creato il",
      accessorKey: "createdAt",
    },
    {
      header: "Azioni",
      id: "actions",
      size: 220,
      Cell: ({ row }) => {
        const post = row.original;

        return (
          <Stack direction="row" spacing={1}>
            <Button
              component={RouterLink}
              to={`/posts/${post.id}`}
              size="small"
              variant="outlined"
            >
              Dettaglio
            </Button>

            <Button
              size="small"
              variant="contained"
              onClick={() => onEdit(post)}
            >
              Modifica
            </Button>
          </Stack>
        );
      },
    },
  ];
}