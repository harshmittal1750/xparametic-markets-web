import { useCallback, useState } from 'react';

type States = 'load' | 'error' | 'ok';

interface UseImage
  extends Pick<
    React.ComponentPropsWithRef<'img'>,
    'ref' | 'onLoad' | 'onError'
  > {
  state: States;
}

export default function useImage(): UseImage {
  const [state, setState] = useState<States>('load');

  return {
    ref: useCallback((image: HTMLImageElement | null) => {
      if (image?.complete) {
        if (!image.naturalWidth || !image.naturalHeight) setState('error');
        else setState('ok');
      }
    }, []),
    onError: useCallback(() => setState('error'), []),
    onLoad: useCallback(() => setState('ok'), []),
    state
  };
}
