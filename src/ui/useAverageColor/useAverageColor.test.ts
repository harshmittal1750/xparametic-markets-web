import { useRef } from 'react';

import { renderHook } from '@testing-library/react-hooks';

import useAverageColor from './useAverageColor';

function renderAverageColor() {
  const node = document.createElement('img');

  node.src = 'https://color.adobe.com/media/theme/92471.png';

  return renderHook(() => {
    const ref = useRef(node);

    return useAverageColor(ref);
  });
}

it('returns the RGB channels color', async () => {
  const { result, waitForNextUpdate } = renderAverageColor();

  expect(result.current).toMatchObject({
    red: 0,
    green: 0,
    blue: 0
  });
  await waitForNextUpdate();
  expect(result.current).toMatchObject({
    red: 255,
    green: 255,
    blue: 255
  });
});
