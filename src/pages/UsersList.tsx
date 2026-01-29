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
import { getUsers, deleteUser } from "../api/users.api";
import UsersDrawer from "../components/users/UsersDrawer";
import type { User } from "../types/user";
import { useUsersDrawer } from "../hook/useUsersDrawer";
import { getUsersColumns } from "../components/users/users.columns";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const { drawerOpen, drawerMode, selectedUser, openCreate, openEdit, close } = useUsersDrawer();
  const {
    pagination,
    sorting,
    columnFilters,
    globalFilter,
    setPagination,
    setSorting,
    setColumnFilters,
    setGlobalFilter,
  } = useTableState("usersTableState.v1");

  async function fetchUsers() {
    setLoading(true);
    setErrorMsg(null);

    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      setErrorMsg("Errore nel caricamento degli utenti.");
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
    if (confirm("Sei sicuro di voler eliminare questo utente?")) {
      try {
        await deleteUser(userId.toString());
        await fetchUsers(); // Ricarica i dati
      } catch (error) {
        console.error("Errore nell'eliminazione dell'utente:", error);
      }
    }
  }

  // Definizione delle colonne usando la funzione importata
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
      onClick: () => handleViewUser(row.original.id),
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
          Create New User
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
            Users Management
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
              {users.length} Total Registered Users
            </Typography>
          </Box>
        </Box>
      </Stack>

      {/* Material React Table */}
      <MaterialReactTable table={table} />

      {/* Drawer */}
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