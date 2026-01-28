// src/hook/usePostsDrawer.ts

import { useMemo, useState } from "react";
import type { Post } from "../types/post";
import type { MRT_ColumnDef } from "material-react-table";
import { getPostsColumns } from "../components/posts/posts.colums";

/**
 * Hook personalizzato per gestire lo stato del drawer dei posts
 */
export function usePostsDrawer() {
  // =======================
  // STATE DRAWER
  // =======================
  type DrawerMode = "create" | "edit";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("create");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  function openCreate() {
    setDrawerMode("create");
    setSelectedPost(null);
    setDrawerOpen(true);
  }

  function openEdit(post: Post) {
    setDrawerMode("edit");
    setSelectedPost(post);
    setDrawerOpen(true);
  }

  function close() {
    setDrawerOpen(false);
  }

  // =======================
  // COLONNE
  // =======================
  const columns = useMemo<MRT_ColumnDef<Post>[]>(
    () =>
      getPostsColumns({
        onEdit: openEdit,
      }),
    []
  );

  return {
    // state
    drawerOpen,
    drawerMode,
    selectedPost,
    columns,
    // actions
    openCreate,
    openEdit,
    close,
  };
}
