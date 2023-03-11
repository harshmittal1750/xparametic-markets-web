import { useEffect, useState } from 'react';

import { PolkamarketsService } from 'services';
import { Container } from 'ui';

import { Text, CreateMarketForm } from 'components';

import { useAppSelector, useNetwork } from 'hooks';

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
    <Container $size="sm" $enableGutters className="pm-p-create-market">
      {needsBuyPolk && (
        <div className="pm-p-create-market__notification-overlay">
          <CreateMarketBuyPolk requiredPolkBalance={requiredBalance} />
        </div>
      )}
      <Text
        as="h4"
        scale="heading"
        fontWeight="semibold"
        className="pm-p-create-market__header-title"
      >
        Create New Market
      </Text>
      <CreateMarketForm />
    </Container>
  );
}

export default CreateMarket;
