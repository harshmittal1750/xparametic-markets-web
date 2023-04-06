export type Outcome = {
  id: string;
  name: string;
  probability: number;
};

export type CreateMarketFormData = {
  question: string;
  outcomes: Outcome[];
  image: {
    file: any;
    hash: string;
    isUploaded: boolean;
  };
  category: string;
  subcategory: string;
  closingDate: string;
  liquidity: number;
  resolutionSource: string;
};
