import { Fragment, useState } from 'react';

import classNames from 'classnames';
import { ui } from 'config';
import type { Providers } from 'config';
import { Spinner } from 'ui';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderHide from 'components/ModalHeaderHide';
import ModalHeaderTitle from 'components/ModalHeaderTitle';
import ModalSection from 'components/ModalSection';
import ProfileSigninEmail from 'components/ProfileSigninEmail';
import Text from 'components/Text';

import { useAppDispatch, usePolkamarketsService } from 'hooks';

import profileSigninClasses from './ProfileSignin.module.scss';

export default function ProfileSignin() {
  const dispatch = useAppDispatch();
  const polkamarketsService = usePolkamarketsService();
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState<Providers | ''>('');

  function handleShow() {
    setShow(true);
  }
  function handleHide() {
    setShow(false);
  }
  async function handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
    const name = event.currentTarget.name as Providers;

    try {
      setLoad(name);

      const success = await polkamarketsService[`socialLogin${name}`](
        name === 'Email' ? event.currentTarget.dataset.email : undefined
      );

      if (success) {
        const { login } = await import('redux/ducks/polkamarkets');

        dispatch(login(polkamarketsService));
      }
    } finally {
      setLoad('');
      setShow(false);
    }
  }

  return (
    <>
      <Modal show={show} centered size="sm" onHide={handleHide}>
        <ModalContent>
          <ModalHeader>
            <ModalHeaderHide onClick={handleHide} />
            <ModalHeaderTitle>Sign In</ModalHeaderTitle>
          </ModalHeader>
          <ModalSection className={profileSigninClasses.providers}>
            <Text
              fontWeight="medium"
              scale="caption"
              color="white"
              className={profileSigninClasses.subtitle}
            >
              Select one of the following to continue.
            </Text>
            {ui.socialLogin.providers.map(provider => {
              const Component = (() => {
                if (provider === 'Email') return ProfileSigninEmail;
                if (provider === 'MetaMask') return ConnectMetamask;
                return Button;
              })();

              return (
                <Fragment key={provider}>
                  <Component
                    className={classNames(
                      profileSigninClasses.provider,
                      profileSigninClasses.social,
                      {
                        [profileSigninClasses.socialGoogle]:
                          provider === 'Google',
                        [profileSigninClasses.socialFacebook]:
                          provider === 'Facebook',
                        [profileSigninClasses.socialDiscord]:
                          provider === 'Discord',
                        [profileSigninClasses.socialMetaMask]:
                          provider === 'MetaMask'
                      }
                    )}
                    variant="outline"
                    color="default"
                    size="sm"
                    name={provider}
                    aria-label={provider}
                    onClick={handleLogin}
                  >
                    {provider}
                    {load === provider ? (
                      <Spinner />
                    ) : (
                      <Icon
                        size="lg"
                        name={provider === 'Email' ? 'LogIn' : provider}
                      />
                    )}
                  </Component>
                </Fragment>
              );
            })}
          </ModalSection>
        </ModalContent>
      </Modal>
      <Button variant="ghost" color="default" size="sm" onClick={handleShow}>
        <Icon
          name="LogIn"
          size="lg"
          className={profileSigninClasses.signinIcon}
        />
        Sign In
      </Button>
    </>
  );
}
