import { useCallback, useMemo } from 'react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export default function useCookie<V>(nameOrPair: string | Record<string, V>) {
  const isName = typeof nameOrPair === 'string';
  const key = isName ? nameOrPair : Object.keys(nameOrPair)[0];
  const cookie = useMemo(
    () =>
      document.cookie?.split('; ').reduce((total, currentCookie) => {
        const [storedKey, storedValue] = currentCookie.split('=');

        return key === storedKey ? decodeURIComponent(storedValue) : total;
      }, ''),
    [key]
  );
  const setCookie = useCallback(
    (value: V) => {
      const expiresAt = dayjs().add(1, 'hour').utc().toString();

      document.cookie = `${key}=${value}; expires=${expiresAt}; path=/`;
    },
    [key]
  );

  return [cookie || (!isName && nameOrPair[key]) || null, setCookie] as const;
}
