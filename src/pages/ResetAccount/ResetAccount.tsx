import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getPortfolio } from 'redux/ducks/portfolio';
import { Container } from 'ui';

import { Button } from 'components';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import styles from './ResetAccount.module.scss';
import ResetAccountMarkets from './ResetAccountMarkets';

function ResetAccount() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { network } = useNetwork();

  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const isLoadingLogin = useAppSelector(
    state => state.polkamarkets.isLoading.login
  );
  const ethAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  const redirectToHome = useCallback(() => {
    history.push('/');
  }, [history]);

  useEffect(() => {
    if (!isLoadingLogin && !isLoggedIn) {
      redirectToHome();
    }
  }, [isLoadingLogin, isLoggedIn, redirectToHome]);

  useEffect(() => {
    async function fetchPortfolio() {
      dispatch(getPortfolio(ethAddress, network.id));
    }

    if (!isLoadingLogin && isLoggedIn) {
      fetchPortfolio();
    }
  }, [dispatch, ethAddress, isLoadingLogin, isLoggedIn, network.id]);

  if (isLoadingLogin) {
    return (
      <div className="flex-row justify-center align-center width-full padding-y-5 padding-x-4">
        <span className="spinner--primary" />
      </div>
    );
  }

  return (
    <Container className="flex-column justify-start align-start gap-5 width-full max-width-screen-xl">
      <div className="flex-row justify-space-between align-center gap-6 width-full margin-bottom-4">
        <div className="flex-column gap-6">
          <h1 className="heading semibold text-1">Reset Account</h1>
          <p className="caption medium text-2">
            Your account has been flagged for suspicious activity. <br /> In
            order to reset your status, you&apos;ll need to burn X TWEEN tokens.
          </p>
          <Button size="sm" color="primary" className={styles.actionButton}>
            Reset Here
          </Button>
        </div>
      </div>
      <ResetAccountMarkets />
    </Container>
  );
}

export default ResetAccount;
