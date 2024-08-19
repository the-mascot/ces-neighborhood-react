// ----------------------------------------------------------------------

const KEY = 'neighborhood-blind';

export function localStorageAvailable() {
  try {
    window.localStorage.setItem(KEY, KEY);
    window.localStorage.removeItem(KEY);

    return true;
  } catch (error) {
    return false;
  }
}

export function localStorageGetItem(key: string, defaultValue = '') {
  const storageAvailable = localStorageAvailable();

  let value;

  if (storageAvailable) {
    value = localStorage.getItem(key) || defaultValue;
  }

  return value;
}

export function sessionStorageAvailable() {
  try {
    window.sessionStorage.setItem(KEY, KEY);
    window.sessionStorage.removeItem(KEY);

    return true;
  } catch (error) {
    return false;
  }
}
