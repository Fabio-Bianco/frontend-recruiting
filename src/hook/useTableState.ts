import { useEffect, useState } from "react";
import { readFromSessionStorage, writeToSessionStorage } from "../utils/storage";
import { DEFAULT_TABLE_STATE, type TableStatePersisted } from "../table/tablePersistence";

export function useTableState(storageKey: string) {
  const saved = readFromSessionStorage<TableStatePersisted>(storageKey);
  
  const [pagination, setPagination] = useState(saved?.pagination ?? DEFAULT_TABLE_STATE.pagination);
  const [sorting, setSorting] = useState(saved?.sorting ?? DEFAULT_TABLE_STATE.sorting);
  const [columnFilters, setColumnFilters] = useState(saved?.columnFilters ?? DEFAULT_TABLE_STATE.columnFilters);
  const [globalFilter, setGlobalFilter] = useState(saved?.globalFilter ?? DEFAULT_TABLE_STATE.globalFilter);

  useEffect(() => {
    writeToSessionStorage(storageKey, { pagination, sorting, columnFilters, globalFilter });
  }, [pagination, sorting, columnFilters, globalFilter, storageKey]);

  return {
    pagination, sorting, columnFilters, globalFilter,
    setPagination, setSorting, setColumnFilters, setGlobalFilter,
  };
}