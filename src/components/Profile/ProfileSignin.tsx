import { Fragment, useState } from 'react';

import { ui } from 'config';
import type { Providers } from 'config';
import { Spinner } from 'ui';

import { Button } from 'components/Button';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderHide from 'components/ModalHeaderHide';
import ModalHeaderTitle from 'components/ModalHeaderTitle';
import ModalSection from 'components/ModalSection';
import Text from 'components/Text';

import { useAppDispatch, usePolkamarketsService } from 'hooks';

import DiscordIcon from '../../assets/icons/DiscordIcon';
import FacebookIcon from '../../assets/icons/FacebookIcon';
import GoogleIcon from '../../assets/icons/GoogleIcon';
import ProfileSigninEmail from './ProfileSigninEmail';

const providers = {
  Discord: <DiscordIcon />,
  Facebook: <FacebookIcon />,
  Google: <GoogleIcon />
};

export default function ProfileSignin() {
  const dispatch = useAppDispatch();
  const polkamarketsService = usePolkamarketsService();
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [pickedProvider, setPickedProvider] = useState<Providers | ''>('');

  function handleShow() {
    setShow(true);
  }
  function handleHide() {
    setShow(false);
  }
  async function handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
    const { name, dataset } = event.currentTarget;

    setPickedProvider(name as Providers);

    try {
      setLoading(true);

      const success = await polkamarketsService[`socialLogin${name}`](
        dataset.email
      );

      if (success) {
        const { login } = await import('redux/ducks/polkamarkets');

        setShow(false);
        dispatch(login(polkamarketsService));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Modal show={show} centered size="sm" onHide={handleHide}>
        <ModalContent>
          <ModalHeader>
            <ModalHeaderHide onClick={handleHide} />
            <ModalHeaderTitle>Login</ModalHeaderTitle>
            <Text as="h4" fontWeight="medium" scale="caption" color="white">
              Select one of the following to continue
            </Text>
          </ModalHeader>
          <ModalSection>
            {ui.socialLogin.providers.map(provider => (
              <Fragment key={provider}>
                {provider === 'Email' ? (
                  <ProfileSigninEmail name={provider} onClick={handleLogin} />
                ) : (
                  <Button
                    style={{ marginRight: '3rem' }}
                    variant="outline"
                    color="default"
                    size="sm"
                    name={provider}
                    onClick={handleLogin}
                  >
                    {isLoading && pickedProvider === provider ? (
                      <Spinner />
                    ) : (
                      providers[provider]
                    )}
                  </Button>
                )}
              </Fragment>
            ))}
          </ModalSection>
        </ModalContent>
      </Modal>
      <Button variant="ghost" color="default" size="sm" onClick={handleShow}>
        <Icon
          name="LogIn"
          size="lg"
          style={{ fill: 'var(--color-text-secondary)' }}
        />
        Sign In
      </Button>
    </>
  );
}
