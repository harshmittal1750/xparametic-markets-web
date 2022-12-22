import { fromTimestampToCustomFormatDate } from 'helpers/date';
import { roundNumber } from 'helpers/math';
import { useGetPortfolioByAddressQuery } from 'services/Polkamarkets';

import { ShareIcon } from 'assets/icons';

import { Tooltip } from 'components';
import { Text } from 'components/new';

import { useNetwork } from 'hooks';
import { IFL } from 'hooks/useNetwork/currencies';

import ProfileSummaryStat from './ProfileSummaryStat';

const ticker = IFL.symbol || IFL.ticker;

type ProfileSummaryProps = {
  address: string;
};

function ProfileSummary({ address }: ProfileSummaryProps) {
  const { network } = useNetwork();
  const { data: portfolio, isLoading } = useGetPortfolioByAddressQuery({
    address,
    networkId: network.id
  });

  if (isLoading || !portfolio) return null;

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
              href={`${network.explorerURL}/address/${address}`}
              rel="noreferrer"
            >
              <ShareIcon className="pm-p-profile-summary__explorer-icon" />
            </a>
          </Tooltip>
        </div>
        <div className="pm-p-profile-summary__history">
          {!!portfolio.firstPositionAt && (
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
                    portfolio.firstPositionAt * 1000,
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
            {`Total predictions: `}
            <Text
              as="strong"
              fontSize="body-4"
              fontWeight="semibold"
              color="2"
              transform="uppercase"
            >
              {portfolio.totalPositions}
            </Text>
          </Text>
        </div>
      </div>
      <div className="pm-p-profile-summary__stats">
        <ProfileSummaryStat
          title="Total earnings"
          value={`${roundNumber(portfolio.closedMarketsProfit, 3)} ${ticker}`}
          backgroundColor="yellow"
        />
        <ProfileSummaryStat
          title="Won predictions"
          value={portfolio.wonPositions.toString()}
          backgroundColor="orange"
        />
      </div>
    </div>
  );
}

export default ProfileSummary;
