import { useEffect, useState } from "react";
import { readFromSessionStorage, writeToSessionStorage } from "../utils/storage";
import { DEFAULT_TABLE_STATE, type TableStatePersisted } from "../table/tablePersistence";

// FUNZIONE CUSTOM HOOK PER GESTIONE STATO TABELLA CON SALVATAGGIO IN SESSION STORAGE
export function useTableState(storageKey: string) {

// Legge lo stato salvato in session storage
  const saved = readFromSessionStorage<TableStatePersisted>(storageKey);
  
  // Stati della tabella con valori iniziali dal salvataggio o di default
  const [pagination, setPagination] = useState(saved?.pagination ?? DEFAULT_TABLE_STATE.pagination);
  const [sorting, setSorting] = useState(saved?.sorting ?? DEFAULT_TABLE_STATE.sorting);
  const [columnFilters, setColumnFilters] = useState(saved?.columnFilters ?? DEFAULT_TABLE_STATE.columnFilters);
  const [globalFilter, setGlobalFilter] = useState(saved?.globalFilter ?? DEFAULT_TABLE_STATE.globalFilter);

  // Useffect per salvare lo stato in session storage ad ogni cambiamento

  useEffect(() => {
    writeToSessionStorage(storageKey, { pagination, sorting, columnFilters, globalFilter });
  }, [pagination, sorting, columnFilters, globalFilter, storageKey]);

  // Ritorna lo stato e le funzioni di settaggio
  return {
    pagination, sorting, columnFilters, globalFilter,
    setPagination, setSorting, setColumnFilters, setGlobalFilter,
  };
}