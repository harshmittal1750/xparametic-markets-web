export type Transaction = {
  state: 'not_started' | 'request' | 'success' | 'failure';
  hash?: string | null;
};
