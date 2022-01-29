import { AnimatePresence, motion } from 'framer-motion';

import { Networks, Text } from 'components';

function WrongNetwork() {
  return (
    <div className="pm-wrong-network">
      <AnimatePresence>
        <div className="pm-c-modal-notification">
          <motion.div
            layout
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            role="status"
          >
            <div className="pm-wrong-network__card">
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
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
}

export default WrongNetwork;
