import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useImage from './useImage';

it('returns states', () => {
  const [state, imageProps] = renderHook(() => useImage()).result.current;

  expect(state).toMatch('load');
  render(<img src="" alt="test" {...imageProps} />);
  expect(state).toMatch('ok');
  fireEvent.error(screen.getByAltText('test'));
  expect(state).toMatch('error');
});
