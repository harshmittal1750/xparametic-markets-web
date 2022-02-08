/* eslint-disable react/jsx-curly-newline */
/* eslint-disable prettier/prettier */
import { PolkamarketsIcon } from 'assets/icons';

import { Button, ModalNotification, Text, Link } from 'components';

function RestrictedCountry() {
  return (
    <div className="pm-restricted-country">
      <ModalNotification visible>
        <div className="pm-restricted-country__card">
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
          <Button
            color="primary"
            size="sm"
            onClick={() =>
              window.open(
                'https://help.polkamarkets.com/en/articles/5623718-ownership-architecture',
                '_blank'
              )
            }
          >
            Learn More
          </Button>
        </div>
      </ModalNotification>
    </div>
  );
}

export default RestrictedCountry;
