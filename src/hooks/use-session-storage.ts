import { useEffect, useState } from 'react';

import { sessionStorageAvailable } from 'src/utils/storage-available';

// ----------------------------------------------------------------------
type UseSessionStorageReturn<T> = [
  value: T | string | null, 
  setValueInSessionStorage: ((newValue: T) => void) & ((updater: (prevValue: T) => T) => void)
];

export function useSessionStorage<T>(
  key: string,
  defaultValue: T
): UseSessionStorageReturn<T> {
  const storageAvailable = sessionStorageAvailable();

  const [value, setValue] = useState(() => {
    const storedValue = storageAvailable ? sessionStorage.getItem(key) : null;

    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    const listener = (e: StorageEvent): void => {
      if (e.storageArea === sessionStorage && e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
      }
    };
    window.addEventListener('storage', listener);

    return (): void => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInSessionStorage = (newValue: T | ((prevValue: T) => T)): void => {
    setValue((currentValue: T) => {
      const result = typeof newValue === 'function' 
        ? (newValue as ((prevValue: T) => T))(currentValue) 
        : newValue;

      if (storageAvailable) {
        sessionStorage.setItem(key, JSON.stringify(result));
      }

      return result;
    });
  };

  return [value, setValueInSessionStorage as any];
}
