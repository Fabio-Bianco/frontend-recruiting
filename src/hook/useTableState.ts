// src/hooks/useTableState.ts



import { useEffect, useState } from "react";
import { readFromSessionStorage, writeToSessionStorage } from "../utils/storage";
import {
  DEFAULT_TABLE_STATE,
  type TableStatePersisted,
} from "../table/tablePersistence";

/**
 * Hook riutilizzabile per persistere lo stato UI di una tabella (MRT):
 * - pagination
 * - sorting
 * - columnFilters
 * - globalFilter
 *
 * La persistenza avviene su sessionStorage usando la storageKey passata.
 */
export function useTableState(storageKey: string) {
  const saved = readFromSessionStorage<TableStatePersisted>(storageKey);
  const [pagination, setPagination] = useState(
    saved?.pagination ?? DEFAULT_TABLE_STATE.pagination
  );
  const [sorting, setSorting] = useState(
    saved?.sorting ?? DEFAULT_TABLE_STATE.sorting
  );
  const [columnFilters, setColumnFilters] = useState(
    saved?.columnFilters ?? DEFAULT_TABLE_STATE.columnFilters
  );
  const [globalFilter, setGlobalFilter] = useState(
    saved?.globalFilter ?? DEFAULT_TABLE_STATE.globalFilter
  );

  useEffect(() => {
    const payload: TableStatePersisted = {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
    };
    writeToSessionStorage(storageKey, payload);
  }, [pagination, sorting, columnFilters, globalFilter, storageKey]);

  return {
    // state
    pagination,
    sorting,
    columnFilters,
    globalFilter,

    // setters
    setPagination,
    setSorting,
    setColumnFilters,
    setGlobalFilter,

  };
}