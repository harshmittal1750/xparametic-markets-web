type OutcomeColor = 'purple' | 'pink' | 'blue';

const outcomeColors: { [key: string]: OutcomeColor } = {
  '0': 'purple',
  '1': 'pink',
  '2': 'blue'
};

const colorByOutcomeId = (outcomeId: number | string) =>
  outcomeColors[outcomeId.toString()] || outcomeColors['0'];

export { outcomeColors, colorByOutcomeId };
