import Link from 'components/Link';
import Text from 'components/Text';

export default function Footer() {
  return (
    <footer className="pm-l-footer p-grid mt-auto">
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
    </footer>
  );
}
