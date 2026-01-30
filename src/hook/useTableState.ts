
import { useState, useEffect } from 'react';
import { writeToSessionStorage, readFromSessionStorage } from '../utils/storage';

// Hook per gestire lo stato della tabella con persistenza in session storage
export function useTableState(storageKey: string) {

  // Inizializza lo stato della tabella leggendo dal session storage o usando valori di default
  const [tableState, setTableState] = useState(() => {
    
    // Prova a leggere lo stato salvato dal session storage
    const saved = readFromSessionStorage(storageKey);
    return saved || {
      pagination: { pageIndex: 0, pageSize: 10 },
      sorting: [],
      columnFilters: [],
      globalFilter: ''
    };
  });

  // Ogni volta che lo stato della tabella cambia, salvalo nel session storage
  useEffect(() => {
    writeToSessionStorage(storageKey, tableState);
  }, [storageKey, tableState]);

  return [tableState, setTableState];
}