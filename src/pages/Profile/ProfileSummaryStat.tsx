import { useMemo } from 'react';

import { ui } from 'config';
import { roundNumber } from 'helpers/math';
import type { GetPortfolioByAddressData } from 'services/Polkamarkets/types';
import { Skeleton } from 'ui';

import { AlertMini } from 'components';
import { Text } from 'components/new';

type ProfileStatsProps = {
  isLoading: boolean;
  data?: GetPortfolioByAddressData;
  ticker: string;
};

export default function ProfileSummaryStat({
  isLoading,
  data,
  ticker
}: ProfileStatsProps) {
  const stats = useMemo(
    () => [
      {
        title: 'Total earnings',
        value: data
          ? `${roundNumber(data.closedMarketsProfit, 3)} ${ticker}`
          : '',
        backgroundColor: 'yellow'
      },
      {
        title: 'Won predictions',
        value: data?.wonPositions.toString(),
        backgroundColor: 'orange'
      },
      {
        title: 'Liquidity provided',
        value: data
          ? `${roundNumber(data.liquidityProvided, 3)} ${ticker}`
          : '',
        backgroundColor: 'pink'
      }
    ],
    [data, ticker]
  );

  return (
    <div className="pm-p-profile-summary__stats">
      {(() => {
        if (isLoading)
          return (
            <>
              <Skeleton style={{ height: 76 }} />
              <Skeleton style={{ height: 76 }} />
              <Skeleton style={{ height: 76 }} />
            </>
          );
        if (!data)
          return (
            <AlertMini
              variant="default"
              description="No summary data available."
            />
          );
        return stats
          .filter(stat =>
            !ui.profile.summary.liquidityProvided.enabled
              ? stat.title !== 'Liquidity provided'
              : true
          )
          .map(stat => (
            <div
              key={stat.title}
              className={`pm-p-profile-summary__stat bg-gradient-${stat.backgroundColor}`}
            >
              <Text
                className="text-white-50 whitespace-nowrap"
                as="h5"
                fontSize="body-4"
                fontWeight="bold"
                transform="uppercase"
              >
                {stat.title}
              </Text>
              <Text
                className="text-light"
                as="span"
                fontSize="body-1"
                fontWeight="semibold"
              >
                {stat.value}
              </Text>
            </div>
          ));
      })()}
    </div>
  );
}
