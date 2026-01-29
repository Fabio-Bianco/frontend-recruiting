import { Stack, Button, Typography, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from "@mui/icons-material";
import type { MRT_ColumnDef } from "material-react-table";
import type { Post } from "../../types/post";


// Definisce le colonne della tabella post con azioni di modifica, eliminazione e visualizzazione
type PostColumns = {
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  onView: (postId: number) => void;
};

// Funzione per ottenere le definizioni delle colonne della tabella post
export function getPostsColumns({ onEdit, onDelete, onView }: PostColumns): MRT_ColumnDef<Post>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 80,
    },
    {
      accessorKey: "title",
      header: "Titolo",
      size: 300,
    },
    {
      accessorKey: "content",
      header: "Contenuto",
      size: 250,
      Cell: ({ cell }) => (
        <Typography variant="body2" sx={{ 
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>
          {cell.getValue<string>()}
        </Typography>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Data",
      size: 120,
      Cell: ({ cell }) => (
        <Typography variant="body2">
          {new Date(cell.getValue<string>()).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      id: "actions",
      header: "Azioni",
      size: 150,
      enableSorting: false,
      enableColumnFilter: false,
      Cell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); onView(row.original.id); }}>
            <ViewIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); onEdit(row.original); }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); onDelete(row.original.id); }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];
}