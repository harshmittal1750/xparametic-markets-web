export type Theme = {
  mode: 'light' | 'dark' | 'system';
  setMode: React.Dispatch<React.SetStateAction<Theme['mode']>>;
};
export type ThemeProviderProps = Omit<
  React.ProviderProps<Record<string, unknown>>,
  'value'
>;
