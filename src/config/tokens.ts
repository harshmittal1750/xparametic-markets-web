import type { Token } from 'types/token';

const USDC: Token = {
  name: 'USD Coin',
  ticker: 'USDC',
  symbol: 'USDC',
  iconName: 'USDCoin',
  addresses: {
    Moonriver: '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
    Moonbeam: '0x8f552a71efe5eefc207bf75485b356a0b3f01ec9',
    Goerli: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
    Polygon: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
  }
};

export default { USDC };
