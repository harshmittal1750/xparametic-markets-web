export default function getFocusEdge<V extends HTMLElement | null>(
  node: V,
  focusableElements: string[]
) {
  const els = node?.querySelectorAll(focusableElements.join(', '));
  const start = els?.[0] as HTMLElement;
  const end = els?.[els.length - 1] as HTMLElement;

  return { start, end };
}
