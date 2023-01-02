import { useEffect, useState } from 'react';

import { getUserCountry } from 'helpers/location';

import { PolkamarketsIcon } from 'assets/icons';

import Link from 'components/Link';
import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import ModalFooter from 'components/ModalFooter';
import ModalHeader from 'components/ModalHeader';
import ModalSection from 'components/ModalSection';
import Text from 'components/Text';

const restrictedCountries =
  process.env.REACT_APP_RESTRICTED_COUNTRIES?.split(',');

export default function RestrictedCountry() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    (async function fetchUserCountry() {
      if (restrictedCountries?.length) {
        const userCountry = await getUserCountry();

        setShow(restrictedCountries.includes(userCountry.countryCode));
      }
    })();
  }, []);

  return (
    <Modal show={show} centered size="sm">
      <ModalContent>
        <ModalHeader style={{ textAlign: 'center' }}>
          <PolkamarketsIcon />
          <Text
            as="h5"
            scale="heading"
            fontWeight="bold"
            color="white"
            style={{ textAlign: 'center' }}
          >
            Polkamarkets is not available in your country
          </Text>
        </ModalHeader>
        <ModalSection>
          <Text
            as="p"
            scale="body"
            fontWeight="medium"
            color="lighter-gray"
            style={{
              textAlign: 'center',
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
  );
}
