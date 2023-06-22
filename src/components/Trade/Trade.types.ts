export type View = 'default' | 'modal';

export type ViewConfig = {
  background: {
    image: boolean;
  };
  market: {
    details: boolean;
  };
};

export type Views = {
  [key in View]: ViewConfig;
};
