import { PolkamarketsIcon } from 'assets/icons';

import {
  // Link,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader
  // ModalSection,
  // ModalSectionText,
  // Text
} from 'components';

export default function RestrictedCountry() {
  return (
    <div className="pm-restricted-country">
      <Modal show centered size="sm">
        <ModalContent className="pm-restricted-country__content">
          <ModalHeader>
            <PolkamarketsIcon />
            {/* <Text
              as="h5"
              scale="heading"
              fontWeight="bold"
              className="pm-restricted-country__content-title"
            >
              Parametric is not available in your country
            </Text> */}
          </ModalHeader>
          {/* <ModalSection>
            <ModalSectionText>
              At the moment Parametric Services and POLK Token (POLK) are not
              available in{' '}
              <Link
                href="https://www.polkamarkets.com/legal/terms-conditions"
                title="Excluded Jurisdictions."
                scale="caption"
                fontWeight="medium"
                className="text-gray"
                target="_blank"
              />
            </ModalSectionText>
            <ModalSectionText>
              For further information please contact us on{' '}
              <Link
                href="mailto:general@polkamarkets.com"
                title="general@polkamarkets.com"
                scale="caption"
                fontWeight="medium"
                className="text-gray"
                target="_blank"
              />
            </ModalSectionText>
          </ModalSection> */}
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
