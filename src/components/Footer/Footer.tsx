import cn from 'classnames';
import { Container } from 'ui';

import Link from 'components/Link';
import Text from 'components/Text';

import footerClasses from './Footer.module.scss';

export interface FooterProps
  extends Pick<React.ComponentPropsWithoutRef<'footer'>, 'className'> {
  $gutterTop?: boolean;
}

export default function Footer({ className, $gutterTop }: FooterProps) {
  return (
    <footer
      className={cn(
        footerClasses.root,
        { [footerClasses.gutterTop]: $gutterTop },
        className
      )}
    >
      <Container className={footerClasses.container}>
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
      </Container>
    </footer>
  );
}
