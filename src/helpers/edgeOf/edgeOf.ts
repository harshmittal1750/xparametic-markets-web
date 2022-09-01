export default function edgeOf<V>(params: V[]): [V, V] {
  const [start, ...ends] = params;
  const end = ends.slice(-1)[0];

  return [start, end];
}
