// https://medium.com/swlh/react-hooks-usecookie-hook-26ac06ff36b0

import { useCallback, useEffect, useState } from 'react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const getItem = key =>
  document.cookie.split('; ').reduce((total, currentCookie) => {
    const item = currentCookie.split('=');
    const storedKey = item[0];
    const storedValue = item[1];

    return key === storedKey ? decodeURIComponent(storedValue) : total;
  }, '');

const setItem = (key, value) => {
  const now = dayjs();
  const expiresAt = now.add(1, 'hour');

  document.cookie = `${key}=${value}; expires=${expiresAt
    .utc()
    .toString()}; path=/`;
};

function useCookie(key, defaultValue) {
  const item = getItem(key);
  const [cookie, setCookie] = useState(item || defaultValue);
  const updateCookie = useCallback(
    value => {
      setCookie(value);
      setItem(key, value);
    },
    [key]
  );

  useEffect(() => {
    updateCookie(cookie);
  }, [cookie, updateCookie]);

  return [cookie, updateCookie];
}

export default useCookie;
