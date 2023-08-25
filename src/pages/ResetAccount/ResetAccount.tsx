import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from 'ui';

import { Button } from 'components';

import { useAppSelector } from 'hooks';

import styles from './ResetAccount.module.scss';

function ResetAccount() {
  const history = useHistory();
  const walletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );

  const redirectToHome = useCallback(() => {
    history.push('/');
  }, [history]);

  useEffect(() => {
    if (!walletConnected) {
      redirectToHome();
    }
  }, [redirectToHome, walletConnected]);

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
    </Container>
  );
}

export default ResetAccount;
