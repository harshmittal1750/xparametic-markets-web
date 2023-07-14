import { useMemo } from 'react';

import cn from 'classnames';
import { ui } from 'config';
import { Container } from 'ui';

import Text from 'components/Text';

import styles from './Footer.module.scss';
import { defaultFooterText, getFooterItems } from './Footer.utils';

export interface FooterProps
  extends Pick<React.ComponentPropsWithoutRef<'footer'>, 'className'> {
  $gutterTop?: boolean;
}

export default function Footer({ className, $gutterTop }: FooterProps) {
  const text = ui.layout.footer.text || defaultFooterText;

  const items = useMemo(() => getFooterItems(text), [text]);

  return (
    <footer
      className={cn(styles.root, { [styles.gutterTop]: $gutterTop }, className)}
    >
      <Container className={styles.container}>
        <Text
          as="p"
          scale="caption"
          fontWeight="medium"
          className="pm-l-footer__terms-text-secondary"
        >
          {items.map(item =>
            item.isLink ? (
              <a
                className={cn('caption medium', {
                  [styles.itemLinkDefault]:
                    !item.color || item.color === 'default',
                  [styles.itemLinkPrimary]: item.color === 'primary',
                  [styles.itemLinkUnderline]: item.underline
                })}
                href={item.url!}
                target="_blank"
                rel="noreferrer"
              >
                {item.text}
              </a>
            ) : (
              item.text
            )
          )}
        </Text>
      </Container>
    </footer>
  );
}
