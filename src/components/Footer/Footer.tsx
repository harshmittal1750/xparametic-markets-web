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
      </Container>
    </footer>
  );
}
