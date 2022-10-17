/* eslint-disable react/jsx-curly-brace-presence */
import { VerifiedIcon } from 'assets/icons';

import { Button } from 'components/Button';

import VoteArrows from '../../VoteArrows';
import Text from '../Text';

function VoteModal() {
  return (
    <div className="pm-c-vote-modal">
      <div className="pm-c-vote-modal__header">
        <div className="pm-c-vote-modal__verify-market">
          <VerifiedIcon size="sm" style={{ cursor: 'pointer' }} />
          <Text
            as="span"
            fontSize="body-4"
            fontWeight="semibold"
            transform="uppercase"
            color="violets-are-blue"
          >
            Verify market
          </Text>
        </div>
        <div className="pm-c-vote-modal__body">
          <Text as="p" fontSize="heading-2" fontWeight="medium" color="1">
            {`Polkamarkets is running in Beta is currently underdoing `}
            <a
              className="pm-c-link text-heading-2 font-medium text-violets-are-blue"
              href="www.polkamarkets.com"
            >
              auditing procedures
            </a>
            {`.`}
          </Text>
          <Text as="p" fontSize="body-2" fontWeight="medium" color="3">
            {`I'm baby mlkshk cornhole cray selvage vaporware pinterest typewriter
            tonx messenger bag chia leggings. Cronut affogato vinyl cold-pressed
            shaman fashion axe thundercats.`}
          </Text>
        </div>
      </div>
      <VoteArrows size="large" fullwidth />
      <div className="pm-c-vote-modal__footer">
        <Button size="normal" variant="subtle" color="default" fullwidth>
          Know more
        </Button>
        <Text as="p" fontSize="body-2" fontWeight="medium" color="3">
          {`By clicking you’re agreeing to our `}
          <a
            className="pm-c-link text-body-2 font-medium text-3"
            href="https://www.polkamarkets.com/legal/terms-conditions"
          >
            Terms and Conditions
          </a>
          {`.`}
        </Text>
      </div>
    </div>
  );
}

export default VoteModal;
