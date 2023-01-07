import { PolkamarketsIcon } from 'assets/icons';

import Link from 'components/Link';
import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import ModalFooter from 'components/ModalFooter';
import ModalHeader from 'components/ModalHeader';
import ModalSection from 'components/ModalSection';
import Text from 'components/Text';

export default function RestrictedCountry() {
  return (
    <div className="pm-restricted-country">
      <Modal show centered size="sm">
        <ModalContent className="ta-center">
          <ModalHeader>
            <PolkamarketsIcon />
            <Text
              as="h5"
              scale="heading"
              fontWeight="bold"
              className="t-primary"
            >
              Polkamarkets is not available in your country
            </Text>
          </ModalHeader>
          <ModalSection>
            <Text
              as="p"
              scale="body"
              fontWeight="medium"
              className="t-secondary"
              style={{
                paddingBottom: '1rem',
                whiteSpace: 'pre-line'
              }}
            >
              <>
                {`At the moment Polkamarkets Services and POLK Token (POLK) are not available in `}
                <Link
                  href="https://www.polkamarkets.com/legal/terms-conditions"
                  title="Excluded Jurisdictions."
                  scale="body"
                  fontWeight="medium"
                  className="text-gray"
                  target="_blank"
                />
                {`
            For further information please contact us on `}
                <Link
                  href="mailto:general@polkamarkets.com"
                  title="general@polkamarkets.com"
                  scale="body"
                  fontWeight="medium"
                  className="text-gray"
                  target="_blank"
                />
              </>
            </Text>
          </ModalSection>
          <ModalFooter>
            <a
              style={{ margin: '0 auto' }}
              className="pm-c-button-normal--primary pm-c-button--sm"
              href="https://help.polkamarkets.com/en/articles/5623718-ownership-architecture"
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
