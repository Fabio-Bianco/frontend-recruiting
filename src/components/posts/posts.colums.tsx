// src/components/posts/posts.colums.tsx

import {
  Stack,
  Button,
  Box,
  Typography,
  Avatar,
  Chip,
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
import type { Post } from "../../types/post";

// Immagini placeholder per i posts
const getPostImage = (postId: string) => {
  const images = [
    "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
  ];
  return images[parseInt(postId) % images.length];
};

// Categorie per i posts
const getPostCategory = (postId: string) => {
  const categories = [
    { name: "TECH", color: "#1DB584" },
    { name: "LIFESTYLE", color: "#FF6B6B" },
    { name: "BUSINESS", color: "#4ECDC4" },
    { name: "NEWS", color: "#FFE66D" },
  ];
  return categories[parseInt(postId) % categories.length];
};


function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

type PostColumns = {
  // Funzione chiamata quando si clicca su "Modifica" in una riga
  onEdit: (post: Post) => void;
  // Funzione chiamata quando si clicca su "Elimina" in una riga
  onDelete: (postId: number) => void;
  // Funzione chiamata quando si clicca su "Visualizza" in una riga
  onView: (postId: number) => void;
};

export function getPostsColumns({
  onEdit,
  onDelete,
  onView,
}: PostColumns): MRT_ColumnDef<Post>[] {
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
      accessorKey: "title",
      header: "Titolo",
      size: 300,
      Cell: ({ row }) => (
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
            {row.original.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ 
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {row.original.content || "Nessun contenuto disponibile"}
          </Typography>
        </Box>
      ),
    },
    {
      accessorKey: "category",
      header: "Categoria",
      size: 120,
      Cell: ({ row }) => {
        const category = getPostCategory(row.original.id.toString());
        return (
          <Chip
            label={category.name}
            size="small"
            sx={{
              bgcolor: category.color,
              color: "white",
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
        );
      },
      filterVariant: "select",
      filterSelectOptions: [
        { text: "TECH", value: "TECH" },
        { text: "LIFESTYLE", value: "LIFESTYLE" },
        { text: "BUSINESS", value: "BUSINESS" },
        { text: "NEWS", value: "NEWS" },
      ],
      filterFn: (row, id, filterValue) => {
        if (!filterValue) return true;
        const category = getPostCategory(row.original.id.toString());
        return category.name === filterValue;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Data Creazione",
      size: 140,
      Cell: ({ cell }) => (
        <Typography variant="body2">
          {formatDate(cell.getValue<string>() || new Date().toISOString())}
        </Typography>
      ),
      sortingFn: "datetime",
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