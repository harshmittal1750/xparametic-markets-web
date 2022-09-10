export default function getFocusTrapId<T extends string>(
  id: T
): `focus-trap-${T}` {
  return `focus-trap-${id}`;
}
