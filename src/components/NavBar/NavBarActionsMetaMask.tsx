import { useCallback, useState } from 'react';

import { login } from 'redux/ducks/bepro';
import { BeproService } from 'services';

import { MetaMaskIcon } from 'assets/icons';

import { Button, Modal, Text } from 'components';

import { useAppDispatch, useNetwork } from 'hooks';

import NavBarActionsMetamaskStatus from './NavBarActionsMetaMaskStatus';

export default function NavBarActionsMetamask() {
  const dispatch = useAppDispatch();
  const { networkConfig } = useNetwork();
  const beproService = new BeproService(networkConfig);
  const [show, setShow] = useState(false);
  const handleHide = useCallback(() => {
    setShow(false);
  }, []);

  async function handleMetamask() {
    if (!window.ethereum) {
      setShow(true);
    } else {
      await beproService.login();
      dispatch(login(networkConfig));
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleHide}>
        <NavBarActionsMetamaskStatus />
        <Modal.Header>
          <Text color="light" scale="heading">
            Looks like your browser do not have Metamask installed.
          </Text>
        </Modal.Header>
        <Text color="light-gray" scale="caption">
          Please follow up the instructions to install it, make sure your wallet
          is unlocked with at least one account on it and try again.
        </Text>
        <Modal.Footer>
          <Button fullwidth color="primary" variant="outline">
            Try Again
          </Button>
          <Button fullwidth color="primary">
            Install
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        variant="outline"
        color="default"
        size="sm"
        onClick={handleMetamask}
      >
        <MetaMaskIcon />
        Connect MetaMask
      </Button>
    </>
  );
}
