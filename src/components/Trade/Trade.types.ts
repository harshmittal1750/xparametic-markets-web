export type View = 'default' | 'modal';

export type ViewConfig = {
  background: {
    image: boolean;
  };
  market: {
    categories: boolean;
    title: boolean;
  };
};

export type Views = {
  [key in View]: ViewConfig;
};
