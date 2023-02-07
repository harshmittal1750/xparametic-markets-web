import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import Networks from 'components/Networks';
import Text from 'components/Text';

export default function WrongNetwork() {
  return (
    <div className="pm-wrong-network">
      <Modal show centered size="sm">
        <ModalContent className="pm-wrong-network__card">
          <Text
            as="h5"
            scale="heading"
            fontWeight="bold"
            className="pm-wrong-network__card-title"
          >
            Wrong Network
          </Text>
          <span className="spinner--primary" />
          <Text
            as="p"
            scale="body"
            fontWeight="medium"
            className="pm-wrong-network__card-text"
          >
            Change your MetaMask to one of these available networks
          </Text>
          <Networks />
        </ModalContent>
      </Modal>
    </div>
  );
}
