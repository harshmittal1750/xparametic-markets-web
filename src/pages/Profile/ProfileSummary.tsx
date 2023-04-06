import { ui } from 'config';
import { fromTimestampToCustomFormatDate } from 'helpers/date';
import { roundNumber } from 'helpers/math';
import { useGetPortfolioByAddressQuery } from 'services/Polkamarkets';
import { Skeleton } from 'ui';

import { ShareIcon } from 'assets/icons';

import { Tooltip } from 'components';
import { Text } from 'components/new';

import { useNetwork } from 'hooks';

import ProfileSummaryStat from './ProfileSummaryStat';

type ProfileSummaryProps = {
  address: string;
};

function ProfileSummary({ address }: ProfileSummaryProps) {
  const network = useNetwork();
  const portfolio = useGetPortfolioByAddressQuery({
    address,
    networkId: network.network.id
  });
  const ticker =
    network.network.currency.symbol || network.network.currency.ticker;

  if (portfolio.isLoading)
    return (
      <div className="pm-p-profile-summary">
        <div className="pm-p-profile-summary__details">
          <div className="pm-p-profile-summary__address-group">
            <Skeleton style={{ height: 32 }} />
          </div>
          <div className="pm-p-profile-summary__history">
            <Skeleton style={{ width: 400, height: 16 }} />
          </div>
        </div>
        <div className="pm-p-profile-summary__stats">
          <Skeleton style={{ height: 76 }} />
          <Skeleton style={{ height: 76 }} />
          <Skeleton style={{ height: 76 }} />
        </div>
      </div>
    );

  if (!portfolio.data) return <>Error fetching Portfolio data</>;

  return (
    <div className="pm-p-profile-summary">
      <div className="pm-p-profile-summary__details">
        <div className="pm-p-profile-summary__address-group">
          <Text
            className="pm-p-profile-summary__address"
            as="span"
            fontSize="heading-2"
            fontWeight="bold"
            color="1"
          >
            {address}
          </Text>
          <Tooltip position="bottom-start" text="View on Explorer">
            <a
              target="_blank"
              href={`${network.network.explorerURL}/address/${address}`}
              rel="noreferrer"
            >
              <ShareIcon className="pm-p-profile-summary__explorer-icon" />
            </a>
          </Tooltip>
        </div>
        <div className="pm-p-profile-summary__history">
          {!!portfolio.data?.firstPositionAt && (
            <>
              <Text
                as="span"
                fontSize="body-4"
                fontWeight="semibold"
                color="3"
                transform="uppercase"
              >
                {`First prediction: `}
                <Text
                  as="strong"
                  fontSize="body-4"
                  fontWeight="semibold"
                  color="2"
                  transform="uppercase"
                >
                  {fromTimestampToCustomFormatDate(
                    portfolio.data.firstPositionAt * 1000,
                    'MMMM DD, YYYY'
                  )}
                </Text>
              </Text>
              <span className="pm-c-divider--circle" />
            </>
          )}
          <Text
            as="span"
            fontSize="body-4"
            fontWeight="semibold"
            color="3"
            transform="uppercase"
          >
            Total predictions:{' '}
            <Text
              as="strong"
              fontSize="body-4"
              fontWeight="semibold"
              color="2"
              transform="uppercase"
            >
              {portfolio.data.totalPositions}
            </Text>
          </Text>
        </div>
      </div>
      <div className="pm-p-profile-summary__stats">
        <ProfileSummaryStat
          title="Total earnings"
          value={`${roundNumber(
            portfolio.data.closedMarketsProfit,
            3
          )} ${ticker}`}
          backgroundColor="yellow"
        />
        <ProfileSummaryStat
          title="Won predictions"
          value={portfolio.data.wonPositions.toString()}
          backgroundColor="orange"
        />
        {ui.profile.summary.liquidityProvided.enabled && (
          <ProfileSummaryStat
            title="Liquidity provided"
            value={`${roundNumber(
              portfolio.data.liquidityProvided,
              3
            )} ${ticker}`}
            backgroundColor="pink"
          />
        )}
      </div>
    </div>
  );
}

export default ProfileSummary;
