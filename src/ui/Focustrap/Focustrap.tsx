import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useRef
} from 'react';

import { usePrevious } from 'hooks';

import focustrapClasses from './Focustrap.module.scss';

type FocustrapProps = {
  trappersId: Record<'start' | 'end', string>;
  children: React.ReactElement;
};

const focusables = [
  'a[href]',
  'button:not([disabled])',
  'textarea',
  'input',
  'select'
].join(', ');

export default function Focustrap({ children, trappersId }: FocustrapProps) {
  const { current: focusPrev } = usePrevious(document.activeElement);
  const trapperStart = useRef<HTMLButtonElement>(null);
  const trapperEnd = useRef<HTMLButtonElement>(null);

  useEffect(() => () => (focusPrev as HTMLElement)?.focus(), [focusPrev]);
  useEffect(() => trapperStart.current?.focus(), []);

  return Children.only(
    cloneElement(
      children,
      {
        onFocus: useCallback((event: React.FocusEvent<HTMLElement>) => {
          const els = event.currentTarget.querySelectorAll(focusables);
          const trap = {
            start: els?.[0] as HTMLElement,
            end: els?.[els.length - 1] as HTMLElement
          };
          const edge = {
            start: els?.[1] as HTMLElement,
            end: els?.[els.length - 2] as HTMLElement
          };

          if (event.target === trap.start) {
            window.requestAnimationFrame(() => {
              window.setTimeout(() => edge.end?.focus());
            });
          }
          if (event.target === trap.end) {
            window.requestAnimationFrame(() =>
              window.setTimeout(() => edge.start?.focus())
            );
          }
        }, [])
      },
      <>
        <button
          ref={trapperStart}
          className={focustrapClasses.trap}
          type="button"
          data-testid={trappersId.start}
        />
        {children.props.children}
        <button
          ref={trapperEnd}
          className={focustrapClasses.trap}
          type="button"
          data-testid={trappersId.end}
        />
      </>
    )
  );
}
