import type { IconProps } from 'components/Icon';

export type Token = {
  name: string;
  ticker: string;
  symbol: string;
  iconName: Extract<IconProps['name'], 'USDCoin' | 'Tether'>;
  addresses: {
    [key: string]: `0x${string}`;
  };
};
