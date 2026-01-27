// src/pages/UsersList.tsx
import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { readFromSessionStorage, writeToSessionStorage } from "../utils/storage";
import { MaterialReactTable } from "material-react-table";
import { getUsers } from "../api/users.api";
import UsersDrawer from "../components/users/UsersDrawer";
import type { User } from "../types/user";
import type { 
  MRT_ColumnDef, 
  MRT_PaginationState, 
  MRT_SortingState, 
  MRT_ColumnFiltersState 
} from "material-react-table";

export default function UsersList() {
  /**
   * STATE DATI
   */
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /**
   * STATE UI DELLA TABELLA CON PERSISTENZA
   */
  type UsersTableStatePersisted = {
    pagination: MRT_PaginationState;
    sorting: MRT_SortingState;
    columnFilters: MRT_ColumnFiltersState;
    globalFilter: string;
  };

  const USERS_TABLE_STORAGE_KEY = "usersTableState.v1";

  const saved = readFromSessionStorage<UsersTableStatePersisted>(
    USERS_TABLE_STORAGE_KEY
  );
  const [pagination, setPagination] = useState<MRT_PaginationState>(
    saved?.pagination ?? { pageIndex: 0, pageSize: 10 }
  );
  const [sorting, setSorting] = useState<MRT_SortingState>(
    saved?.sorting ?? []
  );
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    saved?.columnFilters ?? []
  );
  const [globalFilter, setGlobalFilter] = useState<string>(
    saved?.globalFilter ?? ""
  );

  /**
   * SALVATAGGIO AUTOMATICO STATO TABELLA
   */
  useEffect(() => {
    const payload: UsersTableStatePersisted = {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
    };
    writeToSessionStorage(USERS_TABLE_STORAGE_KEY, payload);
  }, [pagination, sorting, columnFilters, globalFilter]);

  /**
   * FETCH USERS
   */
  async function fetchUsers() {
    setLoading(true);
    setErrorMsg(null);

    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setErrorMsg("Errore nel caricamento degli utenti.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * STATE DRAWER
   */
  type DrawerMode = "create" | "edit";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>("create");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  /**
   * FUNZIONI DRAWER
   */
  function openCreateDrawer() {
    setDrawerMode("create");
    setSelectedUser(null);
    setDrawerOpen(true);
  }

  function openEditorDrawer(user: User) {
    setDrawerMode("edit");
    setSelectedUser(user);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  /**
   * DEFINIZIONE COLONNE
   */
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        size: 80,
      },
      {
        header: "Nome",
        accessorKey: "name",
      },
      {
        header: "Email", 
        accessorKey: "email",
      },
      {
        header: "Azioni",
        id: "actions",
        size: 220,
        Cell: ({ row }) => (
          <Stack direction="row" spacing={1}>
            <Button
              component={RouterLink}
              to={`/users/${row.original.id}`}
              variant="outlined"
              size="small"
            >
              Apri
            </Button>

            <Button
              variant="contained"
              size="small"
              onClick={() => openEditorDrawer(row.original)}
            >
              Modifica
            </Button>
          </Stack>
        ),
      },
    ],
    []
  );

  /**
   * RENDER
   */
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
      {/* Header pagina */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Utenti</Typography>

        <Button variant="contained" onClick={openCreateDrawer}>
          Nuovo Utente
        </Button>
      </Stack>

      {/* Material React Table */}
      <MaterialReactTable
        columns={columns}
        data={users}
        enableGlobalFilter
        state={{
          pagination,
          sorting,
          columnFilters,
          globalFilter,
        }}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
      />

      {/* Users Drawer per CRUD */}
      <UsersDrawer
        open={drawerOpen}
        mode={drawerMode}
        onClose={closeDrawer}
        initialUser={selectedUser}
        onSaved={() => {
          closeDrawer();
          fetchUsers();
        }}
      />
    </Box>
  );
}