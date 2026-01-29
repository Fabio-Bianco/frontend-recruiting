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

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { drawerOpen, drawerMode, selectedUser, openCreate, openEdit, close } = useUsersDrawer();
  const { pagination, sorting, columnFilters, globalFilter, setPagination, setSorting, setColumnFilters, setGlobalFilter } = useTableState("usersTableState.v1");

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

  const table = useMaterialReactTable({
    columns,
    data: users,
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