// src/table/tablePersistence.ts

// Utility per la gestione dello stato persistito della tabella (“Ogni tabella persistita deve avere sempre questa forma e partire sempre da questi valori di default”)

// Definizione del tipo per lo stato persistito della tabella
import type {
  MRT_PaginationState,
  MRT_SortingState,
  MRT_ColumnFiltersState,
} from "material-react-table";

// Tipo per lo stato persistito della tabella
export type TableStatePersisted = {
  pagination: MRT_PaginationState;
  sorting: MRT_SortingState;
  columnFilters: MRT_ColumnFiltersState;
  globalFilter: string;
};

// Valori di default per lo stato della tabella
export const DEFAULT_TABLE_STATE: TableStatePersisted = {
  pagination: { pageIndex: 0, pageSize: 10 },
  sorting: [],
  columnFilters: [],
  globalFilter: "",
};
