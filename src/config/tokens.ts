import type { Token } from 'types/token';

const USDT: Token = {
  name: 'Tether',
  ticker: 'USDT',
  symbol: 'USDT',
  iconName: 'Tether',
  addresses: {
    moonriver: '0xb44a9b6905af7c801311e8f4e76932ee959c663c',
    moonbeam: '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
    goerli: '0xe802376580c10fe23f027e1e19ed9d54d4c9311e',
    polygon: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f'
  }
};

const USDC: Token = {
  name: 'USD Coin',
  ticker: 'USDC',
  symbol: 'USDC',
  iconName: 'USDCoin',
  addresses: {
    moonriver: '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
    moonbeam: '0x8f552a71efe5eefc207bf75485b356a0b3f01ec9',
    goerli: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
    polygon: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
  }
};

const POLK: Token = {
  name: 'Polkamarkets',
  ticker: 'POLK',
  symbol: 'POLK',
  iconName: 'Polk',
  addresses: {
    moonriver: '0x8b29344f368b5fa35595325903fe0eaab70c8e1f',
    moonbeam: '0x8b29344f368b5fa35595325903fe0eaab70c8e1f',
    goerli: '0xd9983addca0e51400c50cba7658847ac3a42f026',
    local: '0xd3e19f031b4c60ef162edaf0efc9c9d8b3f8877d',
    polygon: '0x996F19d4b1cE6D5AD72CEaaa53152CEB1B187fD0'
  }
};

const TOKEN: Token = {
  name: 'Token',
  ticker: 'TOKEN',
  symbol: 'TOKEN',
  iconName: 'Token',
  addresses: {}
};

export default [USDT, USDC, POLK, TOKEN];
