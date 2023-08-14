import { useState } from 'react';

import classNames from 'classnames';
import { ui } from 'config';
import type { Providers } from 'config';
import { Spinner } from 'ui';

import { RemoveOutlinedIcon } from 'assets/icons';

import { Button } from 'components/Button';
import ConnectMetamask from 'components/ConnectMetamask';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderTitle from 'components/ModalHeaderTitle';
import ModalSection from 'components/ModalSection';
import ProfileSigninEmail from 'components/ProfileSigninEmail';
import Text from 'components/Text';

import { useAppDispatch, usePolkamarketsService } from 'hooks';

import profileSigninClasses from './ProfileSignin.module.scss';

function getProviderCns(provider: Providers) {
  return classNames(
    profileSigninClasses.provider,
    profileSigninClasses.social,
    {
      [profileSigninClasses.socialGoogle]: provider === 'Google',
      [profileSigninClasses.socialFacebook]: provider === 'Facebook',
      [profileSigninClasses.socialDiscord]: provider === 'Discord',
      [profileSigninClasses.socialTwitter]: provider === 'Twitter',
      [profileSigninClasses.socialMetaMask]: provider === 'MetaMask'
    }
  );
}
function getProviderChild(provider: Providers, isLoading: boolean) {
  return isLoading ? (
    <Spinner $size="md" />
  ) : (
    <Icon size="lg" name={provider === 'Email' ? 'LogIn' : provider} />
  );
}
export default function ProfileSignin() {
  const dispatch = useAppDispatch();
  const polkamarketsService = usePolkamarketsService();
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState<Providers | ''>('');
  const hasSingleProvider = ui.socialLogin.providers.length === 1;
  const singleProviderName = ui.socialLogin.providers[0];

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
      <Modal
        show={show}
        centered
        className={{ dialog: profileSigninClasses.modal }}
        onHide={handleHide}
      >
        <ModalContent>
          <ModalHeader>
            <Button
              variant="ghost"
              className={profileSigninClasses.modalHeaderHide}
              aria-label="Hide"
              onClick={handleHide}
            >
              <RemoveOutlinedIcon />
            </Button>
            <ModalHeaderTitle className={profileSigninClasses.modalHeaderTitle}>
              Login
            </ModalHeaderTitle>
          </ModalHeader>
          <ModalSection>
            <Text
              fontWeight="medium"
              scale="caption"
              className={profileSigninClasses.subtitle}
            >
              Select one of the following to continue.
            </Text>
            <div className={profileSigninClasses.providers}>
              {ui.socialLogin.providers.map(provider => {
                const isLoading = !!load && load === provider;
                const isDisabled = !!load && load !== provider;
                const child = (
                  <>
                    {provider === 'Email' ? '' : provider}
                    {getProviderChild(provider, isLoading)}
                  </>
                );
                const className = getProviderCns(provider);

                if (provider === 'Email')
                  return (
                    <ProfileSigninEmail
                      key={provider}
                      disabled={isDisabled}
                      onSubmit={handleSubmit}
                    >
                      {child}
                    </ProfileSigninEmail>
                  );

                if (provider === 'MetaMask')
                  return (
                    <ConnectMetamask
                      key={provider}
                      className={className}
                      disabled={isDisabled}
                    >
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
                    disabled={isDisabled}
                  >
                    {child}
                  </Button>
                );
              })}
            </div>
          </ModalSection>
        </ModalContent>
      </Modal>
      <Button
        variant="ghost"
        color="default"
        size="sm"
        name={hasSingleProvider ? singleProviderName : undefined}
        onClick={hasSingleProvider ? handleClick : handleShow}
        className={getProviderCns(singleProviderName)}
      >
        <Icon
          name="LogIn"
          size="lg"
          className={profileSigninClasses.signinIcon}
        />
        Login
        {hasSingleProvider && ` with ${singleProviderName}`}
        {getProviderChild(
          singleProviderName,
          !!load && load === singleProviderName
        )}
      </Button>
    </>
  );
}
