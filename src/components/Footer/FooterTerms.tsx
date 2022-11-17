import Link from '../Link';
import Text from '../Text';

function FooterTerms() {
  return (
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
  );
}

export default FooterTerms;
