// ----------------------------------------------------------------------

const KEY = 'neighborhood-blind';

export function localStorageAvailable(): boolean {
  try {
    window.localStorage.setItem(KEY, KEY);
    window.localStorage.removeItem(KEY);

    return true;
  } catch (error) {
    return false;
  }
}

export function localStorageGetItem(key: string, defaultValue = ''): string | null {
  const storageAvailable = localStorageAvailable();

  if (storageAvailable) {
    return localStorage.getItem(key) || defaultValue;
  }

  return null;
}

export function sessionStorageAvailable(): boolean {
  try {
    window.sessionStorage.setItem(KEY, KEY);
    window.sessionStorage.removeItem(KEY);

    return true;
  } catch (error) {
    return false;
  }
}
