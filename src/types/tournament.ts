import { Market } from 'models/market';

export type Tournament = {
  id: number;
  networkId: number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string | null;
  markets?: Pick<Market, 'title' | 'imageUrl' | 'slug'>[];
};
