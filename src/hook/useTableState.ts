import { useState, useEffect } from 'react';
import { writeToSessionStorage, readFromSessionStorage } from '../utils/storage';

export function useTableState(storageKey: string) {
  const [tableState, setTableState] = useState(() => {
    return readFromSessionStorage(storageKey) || {};
  });

  useEffect(() => {
    writeToSessionStorage(storageKey, tableState);
  }, [storageKey, tableState]);

  return [tableState, setTableState];
}