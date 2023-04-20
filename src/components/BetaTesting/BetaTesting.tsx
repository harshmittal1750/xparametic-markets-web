import { useState } from 'react';

import type { Network } from 'types/network';
import { Banner } from 'ui';

import { Button, Icon, Link } from 'components';

import betaTesting from './BetaTesting.module.scss';

type WrongNetworkProps = {
  network: Network;
};

export default function WrongNetwork({ network }: WrongNetworkProps) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Banner
      $type="info"
      $variant="subtle"
      actions={
        <Button size="xs" variant="ghost" onClick={() => setShow(false)}>
          <Icon name="Cross" />
        </Button>
      }
    >
      Welcome to Polkamarkets! You&apos;re on <strong>{network.name}</strong>{' '}
      and placing predictions with <strong>{network.currency.ticker}</strong>.
      Your{' '}
      <Link
        className={betaTesting.link}
        title="feedback"
        target="_blank"
        rel="noreferrer noopener"
        href="//discord.gg/Szjn2EEf7w"
      />{' '}
      is highly appreciated 🎉
    </Banner>
  );
}
