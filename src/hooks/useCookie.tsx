// https://medium.com/swlh/react-hooks-usecookie-hook-26ac06ff36b0

import { useState } from 'react';

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

const useCookie = (key, defaultValue) => {
  const getCookie = () => getItem(key) || defaultValue;
  const [cookie, setCookie] = useState(getCookie());

  const updateCookie = value => {
    setCookie(value);
    setItem(key, value);
  };

  return [cookie, updateCookie];
};

export default useCookie;
