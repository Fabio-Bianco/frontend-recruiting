// src/pages/PostsList.tsx
import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// MUI
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

// Material React Table
import { MaterialReactTable } from "material-react-table";
import type {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_SortingState,
  MRT_ColumnFiltersState,
} from "material-react-table";

// ✅ I tuoi tipi (adatta il path)
import type { Post } from "../types/post";

// ✅ Le tue API (adatta il path + nome funzione)
import { getPosts } from "../api/posts.api";

// ✅ Storage utilities
import { readFromSessionStorage, writeToSessionStorage } from "../utils/storage";

// Tipo per lo stato persistente della tabella
type PostsTableStatePersisted = {
  pagination: MRT_PaginationState;
  sorting: MRT_SortingState;
  columnFilters: MRT_ColumnFiltersState;
  globalFilter: string;
};

const POSTS_TABLE_STORAGE_KEY = "postsTableState.v1";

export default function PostsList() {
  /**
   * =========================================================
   * STATE "DATI" (FETCH)
   * =========================================================
   * Questi sono i dati veri (posts) che arrivano dal backend fake.
   */
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /**
   * =========================================================
   * STATE UI DELLA TABELLA CON PERSISTENZA COMPLETA
   * =========================================================
   * Persistenza di: pagination, sorting, columnFilters, globalFilter
   */
  const saved = readFromSessionStorage<PostsTableStatePersisted>(
    POSTS_TABLE_STORAGE_KEY
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
   * =========================================================
   * SALVATAGGIO AUTOMATICO DELLO STATO TABELLA
   * =========================================================
   * Ogni volta che cambia lo stato, salviamo tutto automaticamente.
   */
  useEffect(() => {
    const payload: PostsTableStatePersisted = {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
    };
    writeToSessionStorage(POSTS_TABLE_STORAGE_KEY, payload);
  }, [pagination, sorting, columnFilters, globalFilter]);

  /**
   * =========================================================
   * FETCH POSTS
   * =========================================================
   * Fetch semplice, dichiarativo.
   * In caso di errore settiamo errorMsg.
   */
  useEffect(() => {
    let isMounted = true; // micro-protezione (evita setState dopo un unmount)

    async function fetchPosts() {
      setLoading(true);
      setErrorMsg(null);

      try {
        const data = await getPosts();
        if (!isMounted) return;
        setPosts(data);
      } catch (err) {
        if (!isMounted) return;
        setErrorMsg("Errore nel caricamento dei posts.");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * =========================================================
   * DEFINIZIONE COLONNE (TIPIZZATE!) TIPIZZAZIONE COLONNE
   * =========================================================
   * useMemo evita di ricreare le colonne ad ogni render.
   * Non è obbligatorio, ma è buona pratica e aiuta performance / stabilità.
   *
   * Importante: MRT_ColumnDef<Post>[] garantisce che accessorKey sia
   * compatibile con i campi di Post (riduce bug e typo).
   */
  const columns = useMemo <MRT_ColumnDef<Post>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        size: 80,
      },
      {
        header: "Titolo",
        accessorKey: "title",
      },
      {
        header: "UserId",
        accessorKey: "userId",
        size: 90,
      },
      {
        header: "Creato il",
        accessorKey: "createdAt",
        // Esempio: se vuoi formattare in futuro, qui puoi usare Cell()
      },
      {
        /**
         * Colonna "Dettagli"
         * - non ha accessorKey perché non legge un campo diretto
         * - usa row.original (che è Post, grazie alla tipizzazione)
         */
        header: "Dettagli",
        id: "details", // id esplicito, così MRT non deve inventarlo
        size: 120,
        Cell: ({ row }) => (
          <Button
            component={RouterLink}
            to={`/posts/${row.original.id}`}
            variant="outlined"
            size="small"
          >
            Apri
          </Button>
        ),
      },
    ],
  []
  );

  /**
   * =========================================================
   * RENDER: loading / error / tabella
   * =========================================================
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
        <Typography variant="h4">Posts</Typography>

        {/* Questo bottone oggi non fa nulla: lo userai per il Drawer CRUD */}
        <Button variant="contained">
          Nuovo Post
        </Button>
      </Stack>

      {/* Material React Table con persistenza completa */}
      <MaterialReactTable
        columns={columns}
        data={posts}
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