import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  storage: Storage = localStorage
) {
  const [value, setValue] = useState<T>(() => {
    const jsonVal = storage.getItem(key);
    if (!jsonVal) {
      if (typeof initialValue === "function") {
        return initialValue();
      }
      return initialValue;
    }
    return JSON.parse(jsonVal);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
