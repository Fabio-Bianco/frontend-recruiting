import { useState } from 'react';
import type { Post } from '../types/post';

export function usePostsDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openCreate = () => {
    setDrawerMode('create');
    setSelectedPost(null);
    setDrawerOpen(true);
  };

  const openEdit = (post: Post) => {
    setDrawerMode('edit');
    setSelectedPost(post);
    setDrawerOpen(true);
  };

  const close = () => {
    setDrawerOpen(false);
    setSelectedPost(null);
  };

  return { drawerOpen, drawerMode, selectedPost, openCreate, openEdit, close };
}
