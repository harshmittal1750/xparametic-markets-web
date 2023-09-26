import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Spinner } from 'ui';

import { PCLLogo } from 'assets/icons';

import {
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalSection,
  ModalSectionText,
  Text
} from 'components';
import { Button } from 'components/Button';
import Icon from 'components/Icon';

import { useWhitelist } from 'contexts/whitelist';

import { useAppDispatch, useAppSelector, usePolkamarketsService } from 'hooks';

import styles from './Whitelist.module.scss';

export default function Whitelist() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const polkamarketsService = usePolkamarketsService();
  const { isLoading, email, isWhitelisted } = useWhitelist();

  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);

  const redirectToHome = useCallback(() => history.push('/'), [history]);

  const handleLogout = useCallback(async () => {
    const { logout } = await import('redux/ducks/polkamarkets');

    polkamarketsService.logoutSocialLogin();
    dispatch(logout());
  }, [dispatch, polkamarketsService]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      redirectToHome();
    }

    if (!isLoading && isWhitelisted) {
      redirectToHome();
    }
  }, [isLoading, isLoggedIn, isWhitelisted, redirectToHome]);

  return (
    <div className={styles.root}>
      <Modal show centered size="sm">
        <ModalContent className={styles.content}>
          <ModalHeader>
            <PCLLogo />
            <Text
              as="h5"
              scale="heading"
              fontWeight="bold"
              className={styles.contentTitle}
            >
              {isLoading
                ? `Please wait while we verify your address`
                : `Your address is not whitelisted`}
            </Text>
          </ModalHeader>
          <ModalSection>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <ModalSectionText>
                  {`The email address ${email} is not whitelisted in our application.`}
                </ModalSectionText>
                <ModalSectionText>
                  For further information please contact us on{' '}
                  <Link
                    href="mailto:general@polkamarkets.com"
                    title="general@polkamarkets.com"
                    scale="caption"
                    fontWeight="medium"
                    className="text-gray"
                    target="_blank"
                  />
                </ModalSectionText>
                <Button
                  variant="normal"
                  color="default"
                  size="sm"
                  className={styles.contentAction}
                  onClick={handleLogout}
                >
                  <Icon name="LogOut" size="lg" />
                  Login with different account
                </Button>
              </>
            )}
          </ModalSection>
        </ModalContent>
      </Modal>
    </div>
  );
}
