export default function getFocusEdge<V extends HTMLElement | null>(
  node?: V,
  focusableElements: string = [
    'a[href]',
    'button:not([disabled])',
    'textarea',
    'input',
    'select'
  ].join(', ')
) {
  const els = node?.querySelectorAll(focusableElements);
  const start = els?.[0] as HTMLElement;
  const end = els?.[els.length - 1] as HTMLElement;

  return { start, end };
}
