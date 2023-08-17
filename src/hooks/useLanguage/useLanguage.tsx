import { useState, useEffect } from 'react';

import type { LanguageCode } from './useLanguage.type';

function useLanguage(): LanguageCode {
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

  return language as LanguageCode;
}

export default useLanguage;
