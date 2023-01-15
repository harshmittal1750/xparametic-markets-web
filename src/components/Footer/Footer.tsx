import Link from 'components/Link';
import Text from 'components/Text';

export type FooterProps = Pick<
  React.ComponentPropsWithoutRef<'footer'>,
  'className'
>;

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`mt-auto ${className}`}>
      <div className="ta-center p-grid bt-thin">
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
