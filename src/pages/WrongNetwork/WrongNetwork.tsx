import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import Networks from 'components/Networks';
import Text from 'components/Text';

export default function WrongNetwork() {
  return (
    <div className="pm-wrong-network">
      <Modal show centered size="sm">
        <ModalContent className="pm-wrong-network__card ta-center">
          <Text as="h5" scale="heading" fontWeight="bold" className="t-primary">
            Wrong Network
          </Text>
          <span className="spinner--primary" />
          <Text
            as="p"
            scale="body"
            fontWeight="medium"
            className="t-secondary"
            style={{ paddingBottom: '1rem' }}
          >
            Change your MetaMask to one of these available networks
          </Text>
          <Networks />
        </ModalContent>
      </Modal>
    </div>
  );
}
