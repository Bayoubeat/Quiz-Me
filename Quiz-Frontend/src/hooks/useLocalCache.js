import { useCallback } from "react";

const useLocalCache = () => {
  const get = useCallback((key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error(`Error reading localStorage key "${key}":`, err);
      return null;
    }
  }, []);

  const set = useCallback((key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error setting localStorage key "${key}":`, err);
    }
  }, []);

  const clear = useCallback((key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing localStorage key "${key}":`, err);
    }
  }, []);

  return { get, set, clear };
};

export default useLocalCache;
