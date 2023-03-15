type SearchBarComponents = 'form' | 'input' | 'button';

export interface SearchBarProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'className'> {
  className?: Partial<Record<SearchBarComponents, string>>;
  onSearch: React.EventHandler<React.FormEvent<HTMLFormElement>>;
}
