import { sessionStorageAvailable } from 'src/utils/storage-available';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export function useSessionStorage<ValueType>(key: string, defaultValue: ValueType) {
  const storageAvailable = sessionStorageAvailable();

  const [value, setValue] = useState(() => {
    const storedValue = storageAvailable ? localStorage.getItem(key) : null;

    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.storageArea === sessionStorage && e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
      }
    };
    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInSessionStorage = (newValue: ValueType) => {
    setValue((currentValue: ValueType) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;

      if (storageAvailable) {
        localStorage.setItem(key, JSON.stringify(result));
      }

      return result;
    });
  };

  return [value, setValueInSessionStorage];
}
