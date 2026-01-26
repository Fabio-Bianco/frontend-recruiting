// src/utils/storage.ts

/**
 * Legge un valore dal sessionStorage e lo deserializza in modo sicuro
 */
export function readFromSessionStorage<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

/**
 * Scrive un valore nel sessionStorage serializzandolo in modo sicuro
 */
export function writeToSessionStorage<T>(key: string, value: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignora errori di storage (quota piena, browser policy, etc.)
  }
}