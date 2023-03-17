import shortenAddress from './shortenAddress';

it('shorts address', () => {
  expect(shortenAddress('0x123456789123456798')).toMatch(/0x1234...6798/);
});
