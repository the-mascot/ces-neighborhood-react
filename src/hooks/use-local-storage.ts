import { useState, useEffect } from 'react';
// utils
import { localStorageAvailable } from 'src/utils/storage-available';

// ----------------------------------------------------------------------
type UseLocalStorageReturn<T> = [
  value: T | string | null, 
  setValueInLocalStorage: ((newValue: T) => void) & ((updater: (prevValue: T) => T) => void)
];

export function useLocalStorage<T>(key: string, defaultValue: T): UseLocalStorageReturn<T> {
  const storageAvailable = localStorageAvailable();

  const [value, setValue] = useState(() => {
    const storedValue = storageAvailable ? localStorage.getItem(key) : null;

    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    const listener = (e: StorageEvent): void => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
      }
    };
    window.addEventListener('storage', listener);

    return (): void => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue: T | ((prevValue: T) => T)): void => {
    setValue((currentValue: T) => {
      const result = typeof newValue === 'function' 
        ? (newValue as ((prevValue: T) => T))(currentValue) 
        : newValue;

      if (storageAvailable) {
        localStorage.setItem(key, JSON.stringify(result));
      }

      return result;
    });
  };

  return [value, setValueInLocalStorage as any];
}
