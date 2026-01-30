import { useState } from 'react';
import type { Post } from '../types/post';

// Hook per gestire il drawer dei post
export function usePostsDrawer() {
 
 // Stato per gestire l'apertura del drawer, la modalità (creazione/modifica) e il post selezionato
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Funzione per aprire il drawer in modalità creazione
  const openCreate = () => {
    setDrawerMode('create');
    setSelectedPost(null);
    setDrawerOpen(true);
  };

  // Funzione per aprire il drawer in modalità modifica
  const openEdit = (post: Post) => {
    setDrawerMode('edit');
    setSelectedPost(post);
    setDrawerOpen(true);
  };

  // Funzione per chiudere il drawer
  const close = () => {
    setDrawerOpen(false);
    setSelectedPost(null);
  };

  // Ritorna lo stato e le funzioni per gestire il drawer
  return { drawerOpen, drawerMode, selectedPost, openCreate, openEdit, close };
}
