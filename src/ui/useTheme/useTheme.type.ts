export type Theme = {
  mode: 'light' | 'dark' | 'system';
  setMode: React.Dispatch<React.SetStateAction<Theme['mode']>>;
};
