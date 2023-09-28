import { createContext, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { pages, environment } from 'config';
import isTrue from 'helpers/isTrue';
import isEmpty from 'lodash/isEmpty';
import { useGetWhitelistStatusQuery } from 'services/Polkamarkets';

import useAppSelector from 'hooks/useAppSelector';

type WhitelistContextState = {
  isEnabled: boolean;
  isLoading: boolean;
  email?: string;
  isWhitelisted: boolean;
  refetch: () => void;
};

const WhitelistContext = createContext<WhitelistContextState>(
  {} as WhitelistContextState
);

function WhitelistProvider({ children }) {
  const history = useHistory();

  const isEnabled = isTrue(environment.FEATURE_FANTASY_WHITELIST);

  const isLoading = useAppSelector(state => state.polkamarkets.isLoading.login);
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);

  const socialLoginInfo = useAppSelector(
    state => state.polkamarkets.socialLoginInfo
  );
  const email = (socialLoginInfo?.email as string) || undefined;

  const hasError = !isEnabled || !email || !isLoggedIn;

  const { data: status, refetch } = useGetWhitelistStatusQuery(
    { email: email! },
    { skip: hasError }
  );

  useEffect(() => {
    function checkWhitelistStatus() {
      if (status && status.isWhitelisted === false) {
        history.push(pages.whitelist.pathname);
      }
    }

    if (!hasError) {
      checkWhitelistStatus();
    }
  }, [email, hasError, history, status]);

  return (
    <WhitelistContext.Provider
      value={{
        isEnabled,
        isLoading,
        email,
        isWhitelisted: status ? status.isWhitelisted === true : false,
        refetch
      }}
    >
      {children}
    </WhitelistContext.Provider>
  );
}

function useWhitelist() {
  const context = useContext(WhitelistContext);

  if (isEmpty(context)) {
    throw new Error('useWhitelist must be used within a WhitelistProvider');
  }
  return context;
}

export { WhitelistContext, WhitelistProvider, useWhitelist };
