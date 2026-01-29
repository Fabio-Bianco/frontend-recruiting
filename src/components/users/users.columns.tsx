import { Stack, Typography, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from "@mui/icons-material";
import type { MRT_ColumnDef } from "material-react-table";
import type { User } from "../../types/user";


// Definisce le colonne della tabella utenti con azioni di modifica, eliminazione e visualizzazione
type UserColumns = {
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  onView: (userId: number) => void;
};

// Funzione per ottenere le definizioni delle colonne della tabella utenti
export function getUsersColumns({ onEdit, onDelete, onView }: UserColumns): MRT_ColumnDef<User>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 80,
    },
    {
      accessorKey: "name",
      header: "Nome",
      size: 200,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 250,
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