import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useImage from './useImage';

it('returns OK state', () => {
  const [state, ...props] = renderHook(() => useImage()).result.current;

  expect(state).toMatch('load');
  render(<img src="" alt="test" {...props} />);
  expect(state).toMatch('ok');
});
it('returns error state', () => {
  const [state, ...props] = renderHook(() => useImage()).result.current;

  render(<img src="" alt="test" {...props} />);
  fireEvent.error(screen.getByAltText('test'));
  expect(state).toMatch('error');
});
