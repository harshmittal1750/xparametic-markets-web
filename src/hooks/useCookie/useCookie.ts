import { useCallback, useMemo } from 'react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export default function useCookie<V>(key: string, defaultValue?: V) {
  const value = useMemo(
    () =>
      document.cookie?.split('; ').reduce((total, currentCookie) => {
        const [storedKey, storedValue] = currentCookie.split('=');

        return key === storedKey ? decodeURIComponent(storedValue) : total;
      }, ''),
    [key]
  );
  const setCookie = useCallback(
    (newValue: V) => {
      const expiresAt = dayjs().add(1, 'hour').utc().toString();

      document.cookie = `${key}=${newValue}; expires=${expiresAt}; path=/`;
    },
    [key]
  );

  return [value || defaultValue || null, setCookie] as const;
}
