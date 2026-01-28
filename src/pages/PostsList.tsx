// src/pages/PostsList.tsx

import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { useTableState } from "../hook/useTableState";
import { getPosts } from "../api/posts.api";
import PostsDrawer from "../components/posts/PostsDrawer";
import type { Post } from "../types/post";
import { usePostsDrawer } from "../hook/usePostsDrawer";



export default function PostsList() {
  // =======================
  // STATE DATI (FETCH)
  // =======================
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // =======================
  // HOOKS PERSONALIZZATI
  // =======================
  const { drawerOpen, drawerMode, selectedPost, columns, openCreate, close } = usePostsDrawer();

  // =======================
  // STATE TABELLA PERSISTITO
  // =======================
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

  // =======================
  // FETCH POSTS
  // =======================
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


  // =======================
  // RENDER
  // =======================
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Posts</Typography>

        <Button variant="contained" onClick={openCreate}>
          Nuovo Post
        </Button>
      </Stack>

      <MaterialReactTable
        columns={columns}
        data={posts}
        enableGlobalFilter
        state={{ pagination, sorting, columnFilters, globalFilter }}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
      />

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
