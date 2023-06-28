import getAverageColor from './getAverageColor';

it('returns the fallback RGB channels color if it fails', () => {
  expect(getAverageColor('')).toMatchObject([48, 51, 190]);
});
it('returns the RGB channels color', () => {
  expect(
    getAverageColor(
      'https://polkamarkets.infura-ipfs.io/ipfs/QmXUiapNZUbxfWpNYMtbT8Xpyk4EdF6gKWa7cw8SBX5gm9'
    )
  ).toMatchObject([48, 51, 190]);
});
