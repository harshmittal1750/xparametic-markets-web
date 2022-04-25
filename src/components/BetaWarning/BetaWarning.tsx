/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { TwarningIcon } from 'assets/icons';

import { Button } from '../Button';
import Checkbox from '../Checkbox';
import Link from '../Link';
import Text from '../Text';

type BetaWarningProps = {
  handleChangeModalVisibility: (visible: boolean) => void;
};

function BetaWarning({ handleChangeModalVisibility }: BetaWarningProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div className="pm-c-beta-warning">
      <div className="pm-c-beta-warning__description">
        <div className="pm-c-beta-warning__header">
          <TwarningIcon />
          <Text as="span" scale="tiny-uppercase" fontWeight="semibold">
            Warning
          </Text>
        </div>
        <Text
          as="h6"
          fontWeight="medium"
          scale="caption"
          className="pm-c-beta-warning__description--primary-text"
        >
          Polkamarkets Protocol is a 100% decentralized protocol for
          informational and educational purposes only. POLKAMARKET OÜ does not
          take any custody, profits or host over any markets.
        </Text>
        <Text
          as="h6"
          fontWeight="medium"
          scale="caption"
          className="pm-c-beta-warning__description--primary-text"
        >
          POLKAMARKET OÜ displays existing markets live on EVMs or sidechains
          and is a graphical user interface for visualizing data and interacting
          with the Polkamarkets Protocol Smart Contracts via your Web 3 injected
          wallet.
        </Text>
        <Text
          as="h6"
          fontWeight="medium"
          scale="caption"
          className="pm-c-beta-warning__description--primary-text"
        >
          By entering the website I confirm I am not a citizen or resident in
          the United States or its territories, nor a US person.
        </Text>
        <Checkbox
          label="text"
          onChange={() => setAcceptedTerms(!acceptedTerms)}
        >
          <Text as="p" scale="caption" fontWeight="medium">
            <>
              {`I Agree to the `}
              <Link
                title="Terms & Service"
                scale="caption"
                fontWeight="medium"
                href="https://www.polkamarkets.com/legal/terms-conditions"
                target="_blank"
              />
              {` & I am aware of the `}
              <Link
                title="Risks & Disclosure"
                scale="caption"
                fontWeight="medium"
                href="https://docs.google.com/document/d/1TR8HYTBOhZeZOb0E5uAo8lbK4v0Oxv3JnQD_AdYENBY/edit"
                target="_blank"
              />
            </>
            .
          </Text>
        </Checkbox>
      </div>
      <div className="pm-c-beta-warning__actions">
        <Button
          variant="normal"
          color="warning"
          fullwidth
          disabled={!acceptedTerms}
          onClick={() => handleChangeModalVisibility(false)}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
}

export default BetaWarning;
