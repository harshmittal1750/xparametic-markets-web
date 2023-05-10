export default function isTrue(value?: string): value is 'true' {
  return value?.toLocaleLowerCase() === 'true';
}
