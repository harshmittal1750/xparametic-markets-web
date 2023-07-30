import { useState } from 'react';

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
  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const name = event.currentTarget.name as Exclude<Providers, 'Email'>;

    try {
      setLoad(name);

      const success = await polkamarketsService[`socialLogin${name}`]();

      if (success) {
        const { login } = await import('redux/ducks/polkamarkets');

        dispatch(login(polkamarketsService));
      }
    } finally {
      setLoad('');
      setShow(false);
    }
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (event.target[0].value) {
      try {
        setLoad('Email');

        const success = await polkamarketsService.socialLoginEmail(
          event.target[0].value
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
  }

  return (
    <>
      <Modal show={show} centered size="sm" onHide={handleHide}>
        <ModalContent>
          <ModalHeader>
            <ModalHeaderHide onClick={handleHide} />
            <ModalHeaderTitle>Login</ModalHeaderTitle>
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
              if (provider === 'Email')
                return <ProfileSigninEmail onSubmit={handleSubmit} />;

              const child = (
                <>
                  {provider}
                  {load === provider ? (
                    <Spinner />
                  ) : (
                    <Icon size="lg" name={provider} />
                  )}
                </>
              );
              const className = classNames(
                profileSigninClasses.provider,
                profileSigninClasses.social,
                {
                  [profileSigninClasses.socialGoogle]: provider === 'Google',
                  [profileSigninClasses.socialFacebook]:
                    provider === 'Facebook',
                  [profileSigninClasses.socialDiscord]: provider === 'Discord',
                  [profileSigninClasses.socialTwitter]: provider === 'Twitter',
                  [profileSigninClasses.socialMetaMask]: provider === 'MetaMask'
                }
              );

              if (provider === 'MetaMask')
                return (
                  <ConnectMetamask className={className}>
                    {child}
                  </ConnectMetamask>
                );

              return (
                <Button
                  variant="outline"
                  color="default"
                  size="sm"
                  key={provider}
                  name={provider}
                  className={className}
                  onClick={handleClick}
                >
                  {child}
                </Button>
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
        Login
      </Button>
    </>
  );
}
