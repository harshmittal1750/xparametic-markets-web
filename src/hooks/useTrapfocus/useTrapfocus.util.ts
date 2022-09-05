export const focusEls =
  'a[href], button:not([disabled]), textarea, input, select';

export function focusEdge<V extends HTMLElement | null>(node: V) {
  const els = node?.querySelectorAll(focusEls);
  const elStart = els?.[0] as HTMLElement;
  const elEnd = els?.[els.length - 1] as HTMLElement;

  return [elStart, elEnd];
}
