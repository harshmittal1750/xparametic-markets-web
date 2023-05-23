import cn from 'classnames';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { roundNumber } from 'helpers/math';
import { Avatar } from 'ui';

import { useNetwork } from 'hooks';

import Breadcrumb from '../../Breadcrumb';
import type { CreateMarketFormData } from '../../CreateMarketForm';
import Icon from '../../Icon';
import Text from '../../Text';
import MarketPreviewClasses from './MarketPreview.module.scss';
import MarketPreviewOutcomes from './MarketPreviewOutcomes';

type MarketPreviewProps = {
  token: any;
};

function MarketPreview({ token }: MarketPreviewProps) {
  const { values } = useFormikContext<CreateMarketFormData>();
  const { network } = useNetwork();

  const {
    image,
    question,
    category,
    subcategory,
    closingDate,
    liquidity,
    fee,
    treasuryFee,
    outcomes
  } = values;

  return (
    <div className="prediction-card">
      <div className={MarketPreviewClasses.body}>
        <div className={MarketPreviewClasses.bodyHeader}>
          {image.isUploaded ? (
            <Avatar
              $radius="lg"
              $size="md"
              alt="Market"
              src={`https://polkamarkets.infura-ipfs.io/ipfs/${image.hash}`}
            />
          ) : null}
          <div className="pm-c-market__body-details">
            <Breadcrumb>
              <Breadcrumb.Item>{category}</Breadcrumb.Item>
              <Breadcrumb.Item>{subcategory}</Breadcrumb.Item>
            </Breadcrumb>
            {question ? (
              <Text as="p" scale="body" fontWeight="medium">
                {question}
              </Text>
            ) : null}
          </div>
        </div>
        <MarketPreviewOutcomes outcomes={outcomes} ticker={token.ticker} />
      </div>
      <div className="prediction-card__footer">
        <div className={cn('pm-c-market-footer', MarketPreviewClasses.footer)}>
          <div className="pm-c-market-footer__stats">
            <Icon name={network.currency.iconName} size="lg" />
            {closingDate && (
              <>
                <span className="pm-c-divider--circle" />
                <Text
                  as="span"
                  scale="tiny-uppercase"
                  fontWeight="semibold"
                  className={MarketPreviewClasses.statsText}
                >
                  <Icon
                    name="Calendar"
                    title="Expires at"
                    className={MarketPreviewClasses.statsIcon}
                  />
                  <Text
                    as="strong"
                    scale="tiny-uppercase"
                    fontWeight="semibold"
                    className={MarketPreviewClasses.statsText}
                  >
                    {dayjs(closingDate).utc().format('MMMM D, YYYY')}
                  </Text>
                </Text>
              </>
            )}
            {!!liquidity && (
              <>
                <span className="pm-c-divider--circle" />
                <Text
                  as="span"
                  scale="tiny-uppercase"
                  fontWeight="semibold"
                  className={MarketPreviewClasses.statsText}
                >
                  <Icon
                    name="Liquidity"
                    title="Liquidity"
                    className={MarketPreviewClasses.statsIcon}
                  />
                  <Text
                    as="strong"
                    scale="tiny-uppercase"
                    fontWeight="semibold"
                    className={MarketPreviewClasses.statsText}
                  >
                    {`${roundNumber(liquidity, 3)} `}
                  </Text>
                  <Text
                    as="strong"
                    scale="tiny-uppercase"
                    fontWeight="semibold"
                    className={MarketPreviewClasses.statsText}
                  >
                    {token.ticker}
                  </Text>
                </Text>
              </>
            )}
            {fee ? (
              <>
                <span className="pm-c-divider--circle" />
                <Text
                  as="span"
                  scale="tiny-uppercase"
                  fontWeight="semibold"
                  className={MarketPreviewClasses.statsText}
                >
                  <Icon
                    name="Fee"
                    title="Trading Fee"
                    className={MarketPreviewClasses.statsIcon}
                  />
                  <Text
                    as="strong"
                    scale="tiny-uppercase"
                    fontWeight="semibold"
                    className={MarketPreviewClasses.statsText}
                  >
                    {`${roundNumber(fee + treasuryFee, 1)}%`}
                  </Text>
                </Text>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketPreview;
