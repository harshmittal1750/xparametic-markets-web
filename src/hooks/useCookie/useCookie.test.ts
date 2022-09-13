import { renderHook } from '@testing-library/react-hooks';
import _dayjs from 'dayjs';

import useCookie from './useCookie';

enum Cookie {
  Key = 'KEY',
  Value = 'VALUE'
}

function renderCookie<V>(_key: string | Record<string, V> = Cookie.Key) {
  return renderHook(({ key }) => useCookie(key), {
    initialProps: {
      key: _key
    }
  });
}

beforeEach(() => {
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: null
  });
});
describe('useCookie', () => {
  it('returns null for non-stored cookie', () => {
    const { result } = renderCookie();
    const [cookie] = result.current;

    expect(cookie).toBeNull();
  });
  it('returns a stored cookie', () => {
    document.cookie = `${Cookie.Key}=${Cookie.Value}; `;

    const { result } = renderCookie();
    const [cookie] = result.current;

    expect(cookie).toBe(Cookie.Value);
  });
  it('returns a default cookie', () => {
    const { result } = renderCookie({
      [Cookie.Key]: Cookie.Value
    });
    const [cookie] = result.current;

    expect(cookie).toBe(Cookie.Value);
  });
  // todo: sets a cookie
});
