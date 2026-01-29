import { useState } from 'react';
import type { User } from '../types/user';

export function useUsersDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openCreate = () => {
    setDrawerMode('create');
    setSelectedUser(null);
    setDrawerOpen(true);
  };

  const openEdit = (user: User) => {
    setDrawerMode('edit');
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const close = () => {
    setDrawerOpen(false);
    setSelectedUser(null);
  };

  return { drawerOpen, drawerMode, selectedUser, openCreate, openEdit, close };
}