import Link from 'components/Link';
import Text from 'components/Text';

import { useFooterVisibility } from 'hooks';

export default function Footer() {
  const footerVisibility = useFooterVisibility();

  if (!footerVisibility.visible) return null;

  return (
    <footer className="pm-l-layout__footer">
      <div className="pm-l-footer">
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
      </div>
    </footer>
  );
}
