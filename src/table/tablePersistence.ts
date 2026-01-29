import type { MRT_PaginationState, MRT_SortingState, MRT_ColumnFiltersState } from "material-react-table";

export type TableStatePersisted = {
  pagination: MRT_PaginationState;
  sorting: MRT_SortingState;
  columnFilters: MRT_ColumnFiltersState;
  globalFilter: string;
};

export const DEFAULT_TABLE_STATE: TableStatePersisted = {
  pagination: { pageIndex: 0, pageSize: 10 },
  sorting: [],
  columnFilters: [],
  globalFilter: "",
};
