import { useLocation } from 'react-router-dom';

import cn from 'classnames';
import { routes } from 'config';

import Link from 'components/Link';
import Text from 'components/Text';

export default function Footer() {
  const location = useLocation();

  return (
    <footer className="mt-auto">
      <div
        className={cn('ta-center p-grid bt-thin', {
          'mt-grid': location.pathname !== routes.home.pathname
        })}
      >
        <Text
          as="p"
          scale="caption"
          fontWeight="medium"
          className="pm-l-footer__terms-text-secondary"
        >
          The Illuminate Fantasy League, powered by Polkamarkets is a fantasy
          game.{' '}
          <Link
            title="Learn more in the documentation"
            scale="caption"
            fontWeight="medium"
            href="/docs"
            target="_blank"
          />
          .
        </Text>
      </div>
    </footer>
  );
}
