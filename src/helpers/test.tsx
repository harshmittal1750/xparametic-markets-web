import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import cn from 'classnames';
import store from 'redux/store';

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({
      children
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <Provider store={store}>
        <BrowserRouter>
          <MemoryRouter>{children}</MemoryRouter>
        </BrowserRouter>
      </Provider>
    ),
    ...options
  });
}
export function renderClassName({ withClassName }: { withClassName: string }) {
  const input = cn('class', {
    name: true
  });

  return {
    input,
    expected: `${withClassName} ${input}`
  };
}
export function mockMatchMedia({ matches }: { matches: boolean }) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(media => ({
      matches,
      media,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  });
}
