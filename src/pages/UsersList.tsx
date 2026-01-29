// src/pages/UsersList.tsx
// Pagina per visualizzare la lista degli utenti con funzionalità di CRUD e stato della tabella persistente

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useTableState } from "../hook/useTableState";
import { getUsers, deleteUser } from "../api/users.api";
import UsersDrawer from "../components/users/UsersDrawer";
import type { User } from "../types/user";
import { useUsersDrawer } from "../hook/useUsersDrawer";
import { getUsersColumns } from "../components/users/users.columns";

// Componente principale per la pagina degli utenti
export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { drawerOpen, drawerMode, selectedUser, openCreate, openEdit, close } = useUsersDrawer();

  // Stato della tabella persistente
  const [tableState, setTableState] = useTableState("usersTableState.v1");

  async function fetchUsers() {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      // Ignora errori
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleEditUser(user: User) {
    openEdit(user);
  }

  function handleViewUser(userId: number) {
    navigate(`/users/${userId}`);
  }

  async function handleDeleteUser(userId: number) {
    if (confirm("Eliminare questo utente?")) {
      try {
        await deleteUser(userId.toString());
        await fetchUsers();
      } catch {
        // Ignora errori
      }
    }
  }

  const columns = useMemo(
    () => getUsersColumns({
      onEdit: handleEditUser,
      onDelete: handleDeleteUser,
      onView: handleViewUser,
    }),
    []
  );

  // Configurazione della tabella con Material React Table e stato persistente
  const table = useMaterialReactTable({
    columns,
    data: users,
    state: {
      pagination: tableState.pagination,
      sorting: tableState.sorting,
      columnFilters: tableState.columnFilters,
      globalFilter: tableState.globalFilter,
      isLoading: loading,
    },


    // Callback corretti per Material React Table

    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' 
        ? updater(tableState.pagination || { pageIndex: 0, pageSize: 10 }) 
        : updater;
      setTableState({ ...tableState, pagination: newPagination });
    },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' 
        ? updater(tableState.sorting || []) 
        : updater;
      setTableState({ ...tableState, sorting: newSorting });
    },
    onColumnFiltersChange: (updater) => {
      const newFilters = typeof updater === 'function' 
        ? updater(tableState.columnFilters || []) 
        : updater;
      setTableState({ ...tableState, columnFilters: newFilters });
    },
    onGlobalFilterChange: (value) => {
      setTableState({ ...tableState, globalFilter: value });
    },
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableSorting: true,
    enablePagination: true,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleViewUser(row.original.id),
      sx: { cursor: "pointer" },
    }),
    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={openCreate}>
        Nuovo Utente
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
        Utenti
      </Typography>
      
      <MaterialReactTable table={table} />

      <UsersDrawer
        open={drawerOpen}
        mode={drawerMode}
        onClose={close}
        initialUser={selectedUser}
        onSaved={() => {
          close();
          fetchUsers();
        }}
      />
    </Box>
  );
}