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

import { useWhitelist } from 'contexts/whitelist';

import { useAppSelector } from 'hooks';

import styles from './Whitelist.module.scss';

export default function Whitelist() {
  const history = useHistory();
  const { isLoading, email, isWhitelisted } = useWhitelist();

  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);

  const redirectToHome = useCallback(() => history.push('/'), [history]);

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
                ? `Please wait while we verify your address.`
                : `Your
              address is not whitelisted in our application.`}
            </Text>
          </ModalHeader>
          <ModalSection>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <ModalSectionText>
                  {`The email address ${email} is not whitelisted in our application`}
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
              </>
            )}
          </ModalSection>
        </ModalContent>
      </Modal>
    </div>
  );
}
