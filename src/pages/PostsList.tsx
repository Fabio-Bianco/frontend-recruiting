import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";

import { useTableState } from "../hook/useTableState";
import { getPosts, deletePost } from "../api/posts.api";
import PostsDrawer from "../components/posts/PostsDrawer";
import type { Post } from "../types/post";
import { usePostsDrawer } from "../hook/usePostsDrawer";
import { getPostsColumns } from "../components/posts/posts.colums";

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { drawerOpen, drawerMode, selectedPost, openCreate, openEdit, close } = usePostsDrawer();
  const { pagination, sorting, columnFilters, globalFilter, setPagination, setSorting, setColumnFilters, setGlobalFilter } = useTableState("postsTableState.v1");

  async function fetchPosts() {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch {
      // Ignora errori
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
    if (confirm("Eliminar questo post?")) {
      try {
        await deletePost(postId.toString());
        await fetchPosts();
      } catch {
        // Ignora errori
      }
    }
  }

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
    state: { pagination, sorting, columnFilters, globalFilter, isLoading: loading },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableSorting: true,
    enablePagination: true,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleViewPost(row.original.id),
      sx: { cursor: "pointer" },
    }),
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={openCreate}>
        Nuovo Post
      </Button>
    ),
  });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Posts
      </Typography>
      
      <MaterialReactTable table={table} />

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