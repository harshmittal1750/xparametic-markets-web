import { Currency } from 'types/currency';

import {
  EthereumIcon,
  MoonbeamIcon,
  MoonriverIcon,
  TokenIcon
} from 'assets/icons';

const currencies: { [key: string]: Currency } = Object.freeze({
  DEV: {
    name: 'Dev',
    ticker: 'DEV',
    symbol: 'Ξ',
    icon: <EthereumIcon />,
    iconName: 'Ethereum'
  },
  ETH: {
    name: 'Ethereum',
    ticker: 'ETH',
    symbol: 'Ξ',
    icon: <EthereumIcon />,
    iconName: 'Ethereum'
  },
  MOVR: {
    name: 'MOVR',
    ticker: 'MOVR',
    symbol: 'MOVR',
    icon: <MoonriverIcon />,
    iconName: 'Moonriver'
  },
  GLMR: {
    name: 'Moonbeam',
    ticker: 'GLMR',
    symbol: 'GLMR',
    icon: <MoonbeamIcon />,
    iconName: 'Moonbeam'
  },
  TOKEN: {
    name: 'Token',
    ticker: 'TOKEN',
    symbol: 'TOKEN',
    icon: <TokenIcon />,
    iconName: 'Token'
  }
});

export default currencies;
