export type CreateLeaderboardGroupFormValues = {
  name: string;
  addresses: string;
  image: {
    file: File | undefined;
    hash: string;
    isUploaded: boolean;
  };
  imageUrl?: string;
};
