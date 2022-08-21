import { useCallback, useState } from 'react';

import { login } from 'redux/ducks/bepro';
import { BeproService } from 'services';

import { MetaMaskIconSmall } from 'assets/icons';

import { Button, Modal, Text } from 'components';

import { useAppDispatch, useNetwork } from 'hooks';

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
        <div className="pm-c-beta-warning">
          <div>
            <Text color="light" scale="heading">
              Looks like your browser do not have Metamask installed.
            </Text>
            <Text color="light-gray" scale="caption">
              Please follow up the instructions to install it, make sure your
              wallet is unlocked with at least one account on it and try again.
            </Text>
          </div>
          <div>
            <Button color="primary" variant="outline" fullwidth>
              Try Again
            </Button>
            {/** TODO: A way to use a link with Button styles */}
            <Button fullwidth color="primary">
              Install
            </Button>
          </div>
        </div>
      </Modal>
      <Button
        variant="outline"
        color="default"
        size="sm"
        onClick={handleMetamask}
      >
        <MetaMaskIconSmall />
        Connect MetaMask
      </Button>
    </>
  );
}
