import React, { cloneElement, useCallback, useEffect, useRef } from 'react';

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
  const [edgeStart, ...elements] = Array.from(
    node.querySelectorAll(focusables)
  ) as Array<HTMLElement>;

  return {
    start: edgeStart,
    end: elements[elements.length - 1]
  };
}
export default function Focustrap<E extends HTMLElement>({
  children,
  trappersId
}: FocustrapProps) {
  const focusPrev = useRef<Element | null>(null);
  const edgeStart = useRef<HTMLElement | null>(null);
  const edgeEnd = useRef<HTMLElement | null>(null);
  const onFocus = useCallback((event: React.FocusEvent<E>) => {
    const edge = getFocusables(event.currentTarget);

    edgeStart.current = edge.start;
    edgeEnd.current = edge.end;
  }, []);

  useEffect(() => {
    if (!focusPrev.current) {
      focusPrev.current = document.activeElement;
    }

    return () => {
      (focusPrev.current as HTMLElement)?.focus();
      focusPrev.current = null;
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className={focustrapClasses.trap}
        ref={useCallback((node: HTMLButtonElement | null) => node?.focus(), [])}
        onFocus={useCallback(() => edgeEnd.current?.focus(), [])}
      >
        {trappersId.start}
      </button>
      {cloneElement(children, {
        onFocus
      })}
      <button
        type="button"
        onFocus={useCallback(() => edgeStart.current?.focus(), [])}
        className={focustrapClasses.trap}
      >
        {trappersId.end}
      </button>
    </>
  );
}
