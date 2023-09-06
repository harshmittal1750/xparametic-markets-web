import { useState, useEffect, createContext, ReactNode } from 'react';

import type { LanguageContextState, LanguageCode } from './useLanguage.type';

export const LanguageContext = createContext<LanguageContextState>(
  {} as LanguageContextState
);

type LanguageProviderProps = {
  children: ReactNode;
};

function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<string>(
    document.documentElement.lang
  );

  useEffect(() => {
    function updateLanguage() {
      setLanguage(document.documentElement.lang);
    }

    const observer = new MutationObserver(updateLanguage);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language: language as LanguageCode
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
