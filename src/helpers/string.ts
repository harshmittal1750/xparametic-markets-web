function capitalize(string: string) {
  return string?.[0]?.toUpperCase() + string?.slice(1);
}

function toHexadecimal(value: number | string) {
  return `0x${Number(value).toString(16)}`;
}

export function shiftSlash(arg: string) {
  return arg.replace(/^\//, '');
}

function toMinMax(values: string) {
  const [min, max] = values.split('-');
  return {
    min: min === '' ? 0 : Number(min),
    max: max === '' ? undefined : Number(max)
  };
}

export { capitalize, toHexadecimal, toMinMax };
