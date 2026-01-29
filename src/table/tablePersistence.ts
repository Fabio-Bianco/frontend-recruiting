import type { MRT_PaginationState, MRT_SortingState, MRT_ColumnFiltersState } from "material-react-table";

// Tipo per lo stato della tabella da salvare in sessionStorage
export type TableStatePersisted = {
  pagination: MRT_PaginationState;
  sorting: MRT_SortingState;
  columnFilters: MRT_ColumnFiltersState;
  globalFilter: string;
};

// Stato di default della tabella
export const DEFAULT_TABLE_STATE: TableStatePersisted = {
  pagination: { pageIndex: 0, pageSize: 10 },
  sorting: [],
  columnFilters: [],
  globalFilter: "",
};
