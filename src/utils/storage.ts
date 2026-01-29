export function readFromSessionStorage(key: string) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeToSessionStorage(key: string, value: object | string | number | boolean) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignora errori
  }
}