import { useEffect, useState } from 'react';

import { PolkamarketsService } from 'services';
import { Container } from 'ui';

import { CreateMarketForm } from 'components';

import { useAppSelector, useNetwork } from 'hooks';

import CreateMarketClasses from './CreateMarket.module.scss';
import CreateMarketBuyPolk from './CreateMarketBuyPolk';

function CreateMarket() {
  const { networkConfig } = useNetwork();
  const polkBalance = useAppSelector(state => state.polkamarkets.polkBalance);
  const [requiredBalance, setRequiredBalance] = useState(0);

  const needsBuyPolk = polkBalance < requiredBalance;

  useEffect(() => {
    (async function getMinimumRequiredBalance() {
      const polkamarketsService = new PolkamarketsService(networkConfig);

      const response = await polkamarketsService.getMinimumRequiredBalance();
      setRequiredBalance(response);
    })();
  }, [polkBalance, networkConfig]);

  return (
    <Container $size="sm" className={CreateMarketClasses.root}>
      {needsBuyPolk && (
        <div className="pm-p-create-market__notification-overlay">
          <CreateMarketBuyPolk requiredPolkBalance={requiredBalance} />
        </div>
      )}
      <h2 className={CreateMarketClasses.heading}>
        Create Your Forecasting Market
      </h2>
      <h3 className={CreateMarketClasses.subheading}>
        Set up a new forecasting market by providing the necessary details and
        funding information. Follow the step-by-step process to create a market
        that&apos;s engaging and easy to participate in for users.{' '}
        <a
          href="help.polkamarkets.com"
          className={CreateMarketClasses.subheadingLink}
        >
          Learn more
        </a>
      </h3>
      <CreateMarketForm />
    </Container>
  );
}

export default CreateMarket;
