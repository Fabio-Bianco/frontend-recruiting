// src/pages/PostsList.tsx

import { useEffect, useMemo, useState } from "react";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useTableState } from "../hook/useTableState"
import { getPosts } from "../api/posts.api";
import PostsDrawer from "../components/posts/PostsDrawer";
import type { Post } from "../types/post";
import { getPostsColumns } from "../components/posts/posts.colums";

export default function PostsList() {
  // =======================
  // STATE DATI (FETCH)
  // =======================
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
  // STATE DRAWER
  // =======================
  type DrawerMode = "create" | "edit";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("create");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  function openCreateDrawer() {
    setDrawerMode("create");
    setSelectedPost(null);
    setDrawerOpen(true);
  }

  function openEditorDrawer(post: Post) {
    setDrawerMode("edit");
    setSelectedPost(post);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  // =======================
  // COLONNE (REFactoring)
  // =======================
  const columns = useMemo<MRT_ColumnDef<Post>[]>(
    () =>
      getPostsColumns({
        onEdit: openEditorDrawer, 
      }),
    []
  );

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

        <Button variant="contained" onClick={openCreateDrawer}>
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
        onClose={closeDrawer}
        initialPost={selectedPost}
        onSaved={() => {
          closeDrawer();
          fetchPosts();
        }}
      />
    </Box>
  );
}
