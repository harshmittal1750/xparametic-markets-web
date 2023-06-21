import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useImage from './useImage';

it('returns OK state', () => {
  const { state, ...image } = renderHook(() => useImage()).result.current;

  expect(state).toMatch('load');
  render(<img src="" alt="test" {...image} />);
  expect(state).toMatch('ok');
});
it('returns error state', () => {
  const { state, ...image } = renderHook(() => useImage()).result.current;

  render(<img src="" alt="test" {...image} />);
  fireEvent.error(screen.getByAltText('test'));
  expect(state).toMatch('error');
});
