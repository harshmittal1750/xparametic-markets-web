import { useCallback, useState } from 'react';

import { login } from 'redux/ducks/polkamarkets';

import { MetaMaskIcon, WarningOutlinedIcon } from 'assets/icons';

import { Button } from 'components/Button';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import ModalFooter from 'components/ModalFooter';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderHide from 'components/ModalHeaderHide';
import ModalHeaderTitle from 'components/ModalHeaderTitle';
import ModalSection from 'components/ModalSection';
import ModalSectionText from 'components/ModalSectionText';
import Pill from 'components/Pill';
import Text from 'components/Text';

import { useAppDispatch, usePolkamarketsService } from 'hooks';

import DiscordIcon from '../../assets/icons/DiscordIcon';
import FacebookIcon from '../../assets/icons/FacebookIcon';
import GoogleIcon from '../../assets/icons/GoogleIcon';
import { ui } from '../../config';
import { connectMetamaskProps } from './ConnectMetamask.util';

export default function ConnectMetamask() {
  const dispatch = useAppDispatch();
  const polkamarketsService = usePolkamarketsService();
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleHide = useCallback(() => {
    setShow(false);
  }, []);

  const [email, setEmail] = useState('');

  const handleHideLogin = useCallback(() => {
    setShowLogin(false);
  }, []);

  function handleTryAgain() {
    window.location.reload();
  }

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleMetamaskLogin = useCallback(async () => {
    await polkamarketsService.login();
    dispatch(login(polkamarketsService));
  }, [dispatch, polkamarketsService]);

  function handleMetamaskModal() {
    setShow(true);
  }

  const socialLogin = useCallback(
    async provider => {
      let success;
      // eslint-disable-next-line default-case
      switch (provider) {
        case 'google':
          success = await polkamarketsService.socialLoginGoogle();
          break;
        case 'facebook':
          success = await polkamarketsService.socialLoginFacebook();
          break;
        case 'discord':
          success = await polkamarketsService.socialLoginDiscord();
          break;
        case 'email':
          success = await polkamarketsService.socialLoginEmail(email);
          break;
        case 'metamask':
          success = await polkamarketsService.socialLoginMetamask();
          break;
      }

      if (success) {
        setShowLogin(false);
        dispatch(login(polkamarketsService));
      }
    },
    [dispatch, polkamarketsService, email]
  );

  function isSocialProviderEnabled(provider) {
    return ui.socialLogin.providers.includes(provider);
  }

  return (
    <>
      <Modal
        show={show}
        centered
        size="sm"
        onHide={handleHide}
        {...connectMetamaskProps}
      >
        <ModalContent>
          <ModalHeader>
            <ModalHeaderHide onClick={handleHide} />
            <div className="pm-l-navbar__actions-metamask__status">
              <MetaMaskIcon size={40} />
              <Pill variant="normal" color="danger">
                <WarningOutlinedIcon />
              </Pill>
            </div>
            <ModalHeaderTitle id={connectMetamaskProps['aria-labelledby']}>
              Looks like your browser do not have Metamask installed.
            </ModalHeaderTitle>
          </ModalHeader>
          <ModalSection>
            <ModalSectionText id={connectMetamaskProps['aria-describedby']}>
              Please follow up the instructions to install it, make sure your
              wallet is unlocked with at least one account on it and try again.
            </ModalSectionText>
          </ModalSection>
          <ModalFooter>
            <Button
              fullwidth
              color="primary"
              variant="outline"
              onClick={handleTryAgain}
            >
              Try Again
            </Button>
            <a
              href="https://metamask.io/download.html"
              rel="noopener noreferrer"
              target="_blank"
              className="pm-c-button-normal--primary pm-c-button--normal pm-c-button--fullwidth"
            >
              Install
            </a>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal show={showLogin} centered size="sm" onHide={handleHideLogin}>
        <ModalContent>
          <ModalHeader>
            <ModalHeaderHide onClick={handleHideLogin} />
            <ModalHeaderTitle>Login</ModalHeaderTitle>
            <Text as="h4" fontWeight="medium" scale="caption" color="white">
              Select one of the following to continue
            </Text>
          </ModalHeader>
          <ModalSection>
            {isSocialProviderEnabled('google') && (
              <Button
                style={{ marginRight: '3rem' }}
                variant="outline"
                color="default"
                size="sm"
                onClick={() => socialLogin('google')}
              >
                <GoogleIcon />
              </Button>
            )}
            {isSocialProviderEnabled('facebook') && (
              <Button
                style={{ marginRight: '3rem' }}
                variant="outline"
                color="default"
                size="sm"
                onClick={() => socialLogin('facebook')}
              >
                <FacebookIcon />
              </Button>
            )}
            {isSocialProviderEnabled('discord') && (
              <Button
                variant="outline"
                color="default"
                size="sm"
                onClick={() => socialLogin('discord')}
              >
                <DiscordIcon />
              </Button>
            )}

            {isSocialProviderEnabled('email') && (
              <>
                <ModalSectionText>
                  <hr
                    style={{
                      marginTop: '2rem',
                      border: 'none',
                      borderBottom: '0.1rem solid white'
                    }}
                  />
                </ModalSectionText>
                <ModalSectionText>
                  <form>
                    <div className="pm-c-input__group">
                      <input
                        className="pm-c-input--default"
                        id="email"
                        value={email}
                        placeholder="Write your email here"
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </form>
                  <Button
                    style={{ marginTop: '1rem' }}
                    color="default"
                    size="sm"
                    onClick={() => socialLogin('email')}
                    disabled={!email}
                  >
                    Email login
                  </Button>
                </ModalSectionText>
              </>
            )}

            {isSocialProviderEnabled('metamask') && (
              <>
                <ModalSectionText>
                  <hr
                    style={{
                      marginTop: '2rem',
                      border: 'none',
                      borderBottom: '0.1rem solid white'
                    }}
                  />
                </ModalSectionText>
                <ModalSectionText>
                  <Button
                    variant="outline"
                    color="default"
                    size="sm"
                    onClick={
                      !window.ethereum
                        ? handleMetamaskModal
                        : () => socialLogin('metamask')
                    }
                  >
                    <MetaMaskIcon />
                    Connect MetaMask
                  </Button>
                </ModalSectionText>
              </>
            )}
          </ModalSection>
        </ModalContent>
      </Modal>

      {!ui.socialLogin.enabled && (
        <Button
          variant="outline"
          color="default"
          size="sm"
          onClick={!window.ethereum ? handleMetamaskModal : handleMetamaskLogin}
        >
          <MetaMaskIcon />
          Connect MetaMask
        </Button>
      )}
      {ui.socialLogin.enabled && (
        <Button variant="ghost" color="default" size="sm" onClick={handleLogin}>
          <Icon
            name="LogIn"
            size="lg"
            style={{ fill: 'var(--color-text-secondary)' }}
          />
          Sign In
        </Button>
      )}
    </>
  );
}
