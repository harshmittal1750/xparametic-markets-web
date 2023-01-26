function floorNumber(value: number, decimals: number) {
  return Math.floor(value * 10 ** decimals) / 10 ** decimals;
}

function roundNumber(value: number, decimals: number) {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
}

function roundDown(value: number) {
  return Math.floor(value * 1e5) / 1e5;
}

function almost(a, b, delta = 0.1) {
  return Math.abs(a - b) < delta;
}

function formatNumberToString(number: number | string) {
  return `${parseFloat(`${number}`).toFixed(0)}`.replace(
    /(\d)(?=(\d\d\d)+(?!\d))/g,
    '$1,'
  );
}

export { roundNumber, floorNumber, roundDown, almost, formatNumberToString };
