import {
  Stack,
  Button,
  Box,
  Typography,
  Avatar,
  IconButton,
  alpha,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import type { MRT_ColumnDef } from "material-react-table";
import type { User } from "../../types/user";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

// Funzione per generare avatar basato sul nome
const getUserAvatar = (name: string) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return initials;
};

// Colori per gli avatar
const getAvatarColor = (userId: string) => {
  const colors = [
    "#1DB584",
    "#FF6B6B", 
    "#4ECDC4",
    "#FFE66D",
    "#A8E6CF",
    "#FF8B94"
  ];
  return colors[parseInt(userId) % colors.length];
};

type UserColumns = {
  // Funzione chiamata quando si clicca su "Modifica" in una riga
  onEdit: (user: User) => void;
  // Funzione chiamata quando si clicca su "Elimina" in una riga
  onDelete: (userId: number) => void;
  // Funzione chiamata quando si clicca su "Visualizza" in una riga  
  onView: (userId: number) => void;
};

export function getUsersColumns({
  onEdit,
  onDelete,
  onView,
}: UserColumns): MRT_ColumnDef<User>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 80,
      Cell: ({ cell }) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          #{cell.getValue<number>()}
        </Typography>
      ),
    },
    {
      accessorKey: "name",
      header: "Nome",
      size: 250,
      Cell: ({ row }) => (
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: getAvatarColor(row.original.id.toString()),
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {getUserAvatar(row.original.name)}
          </Avatar>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.25 }}>
              {row.original.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {row.original.username}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 200,
      Cell: ({ cell }) => (
        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
          {cell.getValue<string>()}
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
        <Stack direction="row" spacing={0.5}>
          <IconButton
            size="small"
            onClick={() => onView(row.original.id)}
            sx={{ "&:hover": { bgcolor: alpha("#4ECDC4", 0.1) } }}
          >
            <ViewIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onEdit(row.original)}
            sx={{ "&:hover": { bgcolor: alpha("#1DB584", 0.1) } }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(row.original.id)}
            sx={{ "&:hover": { bgcolor: alpha("#FF6B6B", 0.1) } }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];
}