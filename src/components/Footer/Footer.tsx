import cn from 'classnames';

import Link from 'components/Link';
import Text from 'components/Text';

export default function Footer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'footer'>) {
  return (
    <footer className={cn('pm-l-footer', className)} {...props}>
      <div className="pm-l-footer__terms">
        <Text
          as="p"
          scale="caption"
          fontWeight="medium"
          className="pm-l-footer__terms-text-secondary"
          style={{
            textAlign: 'center',
            whiteSpace: 'pre-line'
          }}
        >
          <>
            {`The Illuminate Fantasy League, powered by Polkamarkets is a fantasy game. `}
            <Link
              title="Learn more in the documentation"
              scale="caption"
              fontWeight="medium"
              href="/docs"
              target="_blank"
            />
            .
          </>
        </Text>
      </div>
    </footer>
  );
}
