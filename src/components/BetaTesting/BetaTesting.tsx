import { useState } from 'react';

import type { Network } from 'types/network';
import { Banner } from 'ui';

import { Link } from 'components';

import betaTesting from './BetaTesting.module.scss';

type BetaTestingProps = {
  network: Network;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BetaTesting({ network }: BetaTestingProps) {
  // TODO: Turn content customizable through env
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Banner $type="info" $variant="subtle" onHide={() => setShow(false)}>
      Welcome to the brand new <strong>Polkamarkets V2</strong> 🎉 if you want
      to use V1 use the following{' '}
      <Link
        className={betaTesting.link}
        title="link"
        target="_blank"
        rel="noreferrer noopener"
        href="//v1.polkamarkets.com"
      />
      .
    </Banner>
  );
}
