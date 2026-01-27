// src/pages/UsersList.tsx
/**
 * =========================================================
 * IMPORTAZIONI
 * =========================================================
 */

import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { readFromSessionStorage, writeToSessionStorage } from "../utils/storage";
import { MaterialReactTable } from "material-react-table";
import { getUsers } from "../api/users.api";
import type { User } from "../types/user";
import type { 
  MRT_ColumnDef, 
  MRT_PaginationState, 
  MRT_SortingState, 
  MRT_ColumnFiltersState 
} from "material-react-table";


// Questo componente rappresenta la pagina che mostra la lista degli utenti
export default function UsersList() {

  // -----------------------------
  // 1) DATA (gli utenti dal backend)
  // -----------------------------

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);


  // -----------------------------
  // 2) TABLE STATE (stato tabella)
  // -----------------------------
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

  // -----------------------------
  // 3) LOAD DATA (fetch users)
  // -----------------------------

  // Funzione per caricare gli utenti
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

  // useEffect per il caricamento iniziale
  useEffect(() => {
    fetchUsers();
  }, []);

  // useEffect per salvare lo stato della tabella
  useEffect(() => {
    const payload: UsersTableStatePersisted = {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
    };
    writeToSessionStorage(USERS_TABLE_STORAGE_KEY, payload);
  }, [pagination, sorting, columnFilters, globalFilter]);

  // -----------------------------
  // 4) RENDERING
  // -----------------------------

  // Definizione delle colonne per Material React Table
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
        size: 120,
        Cell: ({ row }) => (
          <Button
            component={RouterLink}
            to={`/users/${row.original.id}`}
            variant="outlined"
            size="small"
          >
            Dettagli
          </Button>
        ),
      },
    ],
    []
  );

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
        <Typography variant="h4">Utenti</Typography>
      </Stack>

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
    </Box>
  );
}
