import { useLocation } from 'react-router-dom';

import cn from 'classnames';
import { pages } from 'config';

import Link from 'components/Link';
import Text from 'components/Text';

export default function Footer() {
  const location = useLocation();

  return (
    <footer className="mt-auto">
      <div
        className={cn('ta-center p-grid bt-thin', {
          'mt-grid': location.pathname !== pages.home.pathname
        })}
      >
        <Text
          as="p"
          scale="caption"
          fontWeight="medium"
          className="pm-l-footer__terms-text-secondary"
        >
          {`Polkamarkets Services and POLK Token (POLK) `}
          <Link
            title="are not available in Excluded Jurisdictions."
            scale="caption"
            fontWeight="medium"
            className="pm-l-footer__terms-text-primary"
            style={{
              textDecoration: 'none'
            }}
            href="https://www.polkamarkets.com/legal/terms-conditions"
            target="_blank"
          />
          {` By accessing and using the interface you agree with our `}
          <Link
            title="Terms & Conditions"
            scale="caption"
            fontWeight="medium"
            href="https://www.polkamarkets.com/legal/terms-conditions"
            target="_blank"
          />
        </Text>
      </div>
    </footer>
  );
}
