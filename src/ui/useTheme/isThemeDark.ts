import { ThemeProps } from './ThemeProvider';

export default function isThemeDark(
  mode: ThemeProps['device']['mode']
): mode is 'dark' {
  return mode === 'dark';
}
