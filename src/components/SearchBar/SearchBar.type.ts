import { InputHTMLAttributes } from 'react';

type SearchBarComponents = 'form' | 'input' | 'button';

export type SearchBarProps = {
  className?: Partial<Record<SearchBarComponents, string>>;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'onChange'>;
