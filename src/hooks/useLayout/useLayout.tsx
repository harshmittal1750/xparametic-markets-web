import { createContext, useContext, useState, useRef } from 'react';

type LayoutContextProps = {
  networkSelector: React.MutableRefObject<HTMLButtonElement | null>;
};
type LayoutProviderProps = Omit<
  React.ProviderProps<Record<string, never>>,
  'value'
>;

const layoutContext = {
  networkSelector: {
    current: null
  }
};
const LayoutContext = createContext<LayoutContextProps>(layoutContext);

export function useLayout() {
  return useContext(LayoutContext);
}
export default function LayoutProvider(props: LayoutProviderProps) {
  const networkSelector = useRef<HTMLButtonElement>(null);
  const [value] = useState(() => ({
    networkSelector
  }));

  return <LayoutContext.Provider value={value} {...props} />;
}
