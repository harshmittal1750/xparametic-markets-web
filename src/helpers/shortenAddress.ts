export default function shortenAddress(addr: string) {
  return addr.match(/^.{6}|.{4}$/gm)?.join('...');
}
