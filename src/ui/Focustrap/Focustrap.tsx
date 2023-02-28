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

function getFocusables(node: HTMLElement) {
  const [trapStart, edgeStart, ...elements] = Array.from(
    node.querySelectorAll(focusables)
  ) as Array<HTMLElement>;
  const { length } = elements;

  return [
    {
      start: trapStart,
      end: elements[length - 1]
    },
    {
      start: edgeStart,
      end: elements[length - 2]
    }
  ];
}
export default function Focustrap({ children, trappersId }: FocustrapProps) {
  const { current: focusPrev } = usePrevious(document.activeElement);
  const trapEnd = useRef<HTMLButtonElement>(null);

  useEffect(() => () => (focusPrev as HTMLElement)?.focus(), [focusPrev]);
  useEffect(() => trapEnd.current?.focus(), []);

  return Children.only(
    cloneElement(
      children,
      {
        onFocus: useCallback((event: React.FocusEvent<HTMLElement>) => {
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
        <button
          type="button"
          className={focustrapClasses.trap}
          data-testid={trappersId.start}
        />
        {children.props.children}
        <button
          type="button"
          ref={trapEnd}
          className={focustrapClasses.trap}
          data-testid={trappersId.end}
        />
      </>
    )
  );
}
