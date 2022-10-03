export default function arrsAreEqual(...args: unknown[][]) {
  const n1 = new Set(args[1]);

  return args[0].map(arg => n1.has(arg)).every(Boolean);
}
