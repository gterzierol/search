import { isBrowser } from "./helpers";

const storage = {
  local: {
    get<T>(key: string, defaultValue: T) {
      if (!isBrowser()) return defaultValue as T;

      const value = window.localStorage.getItem(key);

      try {
        return (value ? JSON.parse(value) : defaultValue) as T;
      } catch (error) {
        return (value || defaultValue) as T;
      }
    },
    set<T>(key: string, value: T) {
      try {
        if (typeof value === "string") {
          window.localStorage.setItem(key, value);
        } else {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error setting localStorage item '${key}':`, error);
      }
    },
    remove(key: string) {
      window.localStorage.removeItem(key);
    },
  },
  session: {
    get<T>(key: string, defaultValue: T) {
      if (!isBrowser()) return defaultValue as T;

      const value = window.sessionStorage.getItem(key);

      try {
        return (value ? JSON.parse(value) : defaultValue) as T;
      } catch (error) {
        return (value || defaultValue) as T;
      }
    },
    set<T>(key: string, value: T) {
      try {
        if (typeof value === "string") {
          window.sessionStorage.setItem(key, value);
        } else {
          window.sessionStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error setting localStorage item '${key}':`, error);
      }
    },
    remove(key: string) {
      window.sessionStorage.removeItem(key);
    },
  },
};

export default storage;
