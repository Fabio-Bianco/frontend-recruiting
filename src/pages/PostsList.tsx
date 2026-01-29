import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  IconButton,
  alpha,
} from "@mui/material";
import {
  Add as AddIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { useTableState } from "../hook/useTableState";
import { getPosts, deletePost } from "../api/posts.api";
import PostsDrawer from "../components/posts/PostsDrawer";
import type { Post } from "../types/post";
import { usePostsDrawer } from "../hook/usePostsDrawer";
import { getPostsColumns } from "../components/posts/posts.colums";

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const { drawerOpen, drawerMode, selectedPost, openCreate, openEdit, close } = usePostsDrawer();
  const {
    pagination,
    sorting,
    columnFilters,
    globalFilter,
    setPagination,
    setSorting,
    setColumnFilters,
    setGlobalFilter,
  } = useTableState("postsTableState.v1");

  async function fetchPosts() {
    setLoading(true);
    setErrorMsg(null);

    try {
      const data = await getPosts();
      setPosts(data);
    } catch {
      setErrorMsg("Errore nel caricamento dei posts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function handleEditPost(post: Post) {
    openEdit(post);
  }

  function handleViewPost(postId: number) {
    navigate(`/posts/${postId}`);
  }

  async function handleDeletePost(postId: number) {
    if (confirm("Sei sicuro di voler eliminare questo post?")) {
      try {
        await deletePost(postId.toString());
        await fetchPosts(); // Ricarica i dati
      } catch (error) {
        console.error("Errore nell'eliminazione del post:", error);
      }
    }
  }

  // Definizione delle colonne usando la funzione importata
  const columns = useMemo(
    () => getPostsColumns({
      onEdit: handleEditPost,
      onDelete: handleDeletePost,
      onView: handleViewPost,
    }),
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: posts,
    // Stato della tabella
    state: {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
      isLoading: loading,
    },
    // Handlers per lo stato
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    
    // Opzioni della tabella
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableSorting: true,
    enablePagination: true,
    
    // UI customization
    muiTableProps: {
      sx: {
        "& .MuiTableHead-root": {
          "& .MuiTableRow-root": {
            backgroundColor: alpha("#1DB584", 0.05),
          },
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        fontWeight: 600,
        fontSize: "0.875rem",
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleViewPost(row.original.id),
      sx: {
        cursor: "pointer",
        "&:hover": {
          backgroundColor: alpha("#1DB584", 0.02),
        },
      },
    }),
    
    // Toolbar customization
    renderTopToolbarCustomActions: () => (
      <Stack direction="row" spacing={2}>
        <IconButton
          sx={{
            bgcolor: alpha("#ffffff", 0.1),
            "&:hover": { bgcolor: alpha("#ffffff", 0.2) },
          }}
        >
          <DownloadIcon />
        </IconButton>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Create New Post
        </Button>
      </Stack>
    ),
  });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (errorMsg) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography color="error">{errorMsg}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Posts Management
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "success.main",
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {posts.length} Total Published Posts
            </Typography>
          </Box>
        </Box>
      </Stack>

      {/* Material React Table */}
      <MaterialReactTable table={table} />

      {/* Drawer */}
      <PostsDrawer
        open={drawerOpen}
        mode={drawerMode}
        onClose={close}
        initialPost={selectedPost}
        onSaved={() => {
          close();
          fetchPosts();
        }}
      />
    </Box>
  );
}