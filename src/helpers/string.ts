function capitalize(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

function toHexadecimal(value: number | string) {
  return `0x${Number(value).toString(16)}`;
}

export { capitalize, toHexadecimal };
