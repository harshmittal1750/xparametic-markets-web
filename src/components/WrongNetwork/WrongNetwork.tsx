import { useEffect } from 'react';

import { environment } from 'config';
import { fetchAditionalData } from 'redux/ducks/polkamarkets';

import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import Networks from 'components/Networks';
import Text from 'components/Text';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

export default function WrongNetwork() {
  const dispatch = useAppDispatch();
  const { network, networkConfig } = useNetwork();
  const walletConnected = useAppSelector(
    state => state.polkamarkets.isLoggedIn
  );
  const isAllowedNetwork =
    !walletConnected || Object.keys(environment.NETWORKS).includes(network.id);

  useEffect(() => {
    if (!isAllowedNetwork && walletConnected) {
      dispatch(fetchAditionalData(networkConfig));
    }
  }, [dispatch, isAllowedNetwork, networkConfig, walletConnected]);

  return (
    <Modal show={!isAllowedNetwork} centered size="sm">
      <ModalContent className="pm-wrong-network__card">
        <Text
          as="h5"
          scale="heading"
          fontWeight="bold"
          color="white"
          style={{ textAlign: 'center' }}
        >
          Wrong Network
        </Text>
        <span className="spinner--primary" />
        <Text
          as="p"
          scale="body"
          fontWeight="medium"
          color="lighter-gray"
          style={{ textAlign: 'center', paddingBottom: '1rem' }}
        >
          Change your MetaMask to one of these available networks
        </Text>
        <Networks />
      </ModalContent>
    </Modal>
  );
}
