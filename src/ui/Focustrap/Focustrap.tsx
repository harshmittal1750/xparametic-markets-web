import React, { Children, cloneElement, useCallback, useEffect } from 'react';

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

function getFocusables(node: HTMLElement) {
  const [trapStart, edgeStart, ...elements] = Array.from(
    node.querySelectorAll(focusables)
  ) as Array<HTMLElement>;

  return [
    {
      start: trapStart,
      end: elements[elements.length - 1]
    },
    {
      start: edgeStart,
      end: elements[elements.length - 2]
    }
  ];
}
export default function Focustrap<E extends HTMLElement>({
  children,
  trappersId
}: FocustrapProps) {
  const { current: focusPrev } = usePrevious(document.activeElement);

  useEffect(() => () => (focusPrev as HTMLElement)?.focus(), [focusPrev]);

  return Children.only(
    cloneElement(
      children,
      {
        onFocus: useCallback((event: React.FocusEvent<E>) => {
          const [trap, edge] = getFocusables(event.currentTarget);

          if (event.target === trap.start) {
            window.requestAnimationFrame(() => {
              window.setTimeout(() => edge.end?.focus());
            });
          }
          if (event.target === trap.end) {
            window.requestAnimationFrame(() => {
              window.setTimeout(() => edge.start?.focus());
            });
          }
        }, [])
      },
      <>
        <button type="button" className={focustrapClasses.trap}>
          {trappersId.start}
        </button>
        {children.props.children}
        <button
          type="button"
          ref={useCallback(
            (node: HTMLButtonElement | null) => node?.focus(),
            []
          )}
          className={focustrapClasses.trap}
        >
          {trappersId.end}
        </button>
      </>
    )
  );
}
