import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { TwarningIcon } from 'assets/icons';

import { Button } from 'components/Button';
import Checkbox from 'components/Checkbox';
import Link from 'components/Link';
import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import ModalFooter from 'components/ModalFooter';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderTitle from 'components/ModalHeaderTitle';
import ModalSection from 'components/ModalSection';
import ModalSectionText from 'components/ModalSectionText';
import Text from 'components/Text';

import { useCookie } from 'hooks';

import { betaWarningProps } from './BetaWarning.util';

export default function BetaWarning() {
  const location = useLocation();
  const hasParam = new URLSearchParams(location.search).get('m');
  const [betaWarningCookie, setBetaWarningCookie] = useCookie(
    'betaWarning',
    'true'
  );
  const [agreed, setAgreed] = useState(false);
  const [show, setShow] = useState(
    hasParam !== 'f' || betaWarningCookie === 'true'
  );

  useEffect(() => {
    setBetaWarningCookie(show?.toString());
  }, [setBetaWarningCookie, show]);
  function handleAgreed() {
    setAgreed(prevAgreed => !prevAgreed);
  }
  function handleProceed() {
    setShow(false);
  }

  return (
    <Modal show={show} backdrop centered size="sm" {...betaWarningProps}>
      <ModalContent>
        <ModalHeader>
          <ModalHeaderTitle
            className="pm-c-beta-warning__header-title"
            scale="tiny-uppercase"
            fontWeight="semibold"
            id={betaWarningProps['aria-labelledby']}
          >
            <TwarningIcon
              className="pm-c-beta-warning__header-title__adornment"
              size={16}
            />
            Warning
          </ModalHeaderTitle>
        </ModalHeader>
        <ModalSection>
          <ModalSectionText>
            The Illuminate Fantasy League, powered by Polkamarkets (the “IFL” or
            “Fantasy League” or “League”), is a fantasy game and does not
            constitute any form or type of gambling or betting activity.
          </ModalSectionText>
          <ModalSectionText>
            Players will not make or be requested to make any payment or
            contribution with financial value to enter and make predictions on
            the Fantasy League.
          </ModalSectionText>
          <ModalSectionText id={betaWarningProps['aria-describedby']}>
            The terms “buy”, “sell”, “price”, “reward”, “profit” or similar
            terms, may be used in this website and refer exclusively to inherent
            mechanics and features of prediction markets and shall not be
            associated with transactions of financial value in the context of
            the Fantasy League.
          </ModalSectionText>
          <Checkbox label="text" onChange={handleAgreed}>
            <Text
              as="label"
              scale="caption"
              fontWeight="medium"
              // @ts-ignore
              htmlFor="text"
            >
              I have read and accept the Documentation and Terms & Conditions.
            </Text>
          </Checkbox>
        </ModalSection>
        <ModalFooter className="pm-c-beta-warning__footer">
          <Button
            variant="normal"
            color="warning"
            fullwidth
            disabled={!agreed}
            onClick={handleProceed}
          >
            Proceed
          </Button>
          <Text as="p" color="gray">
            <Link
              title="Documentation"
              scale="caption"
              fontWeight="medium"
              href="/docs"
              target="_blank"
            />
            {' • '}
            <Link
              title="Terms & Conditions"
              scale="caption"
              fontWeight="medium"
              href="https://www.polkamarkets.com/legal/terms-conditions"
              target="_blank"
            />
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
