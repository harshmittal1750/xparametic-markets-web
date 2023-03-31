import { fromPriceChartToLineChartSeries } from 'helpers/chart';
import { roundNumber } from 'helpers/math';

import { CaretDownIcon, CaretUpIcon } from 'assets/icons';

import { AreaChart, Label, Text } from 'components';

import { useAppSelector } from 'hooks';

import { balance } from './mock';

const PortfolioChart = () => {
  const holdingsChart = useAppSelector(
    state => state.portfolio.portfolio.holdingsChart
  );
  const { holdingsValue, holdingsPerformance } = useAppSelector(
    state => state.portfolio.portfolio
  );

  const holdingsChartData = fromPriceChartToLineChartSeries(holdingsChart);
  const holdingsPerformanceColor =
    holdingsPerformance.change >= 0 ? 'success' : 'danger';

  return (
    <div className="portfolio-chart">
      <div className="portfolio-chart__header">
        <div className="portfolio-chart__header-balance">
          <Text as="h4" scale="heading" fontWeight="semibold" color="light">
            {`${roundNumber(holdingsValue, 2)} €`}
          </Text>
          <Text as="span" scale="tiny" fontWeight="medium" color="dark-gray">
            Total Balance
          </Text>
        </div>
        <div
          className={`portfolio-chart__header-change--${balance.change.type}`}
        >
          <Label color={holdingsPerformanceColor}>
            {holdingsPerformance.change >= 0 ? (
              <CaretUpIcon />
            ) : (
              <CaretDownIcon />
            )}
            {`${roundNumber(
              Math.abs(holdingsPerformance.changePercent) * 100,
              2
            )}%`}
          </Label>
          <Text
            as="span"
            scale="body"
            fontWeight="semibold"
            color={holdingsPerformanceColor}
          >
            {`${roundNumber(holdingsPerformance.change, 2)} €`}
          </Text>
        </div>
      </div>
      <div className="portfolio-chart__view">
        <AreaChart serie={holdingsChartData} ticker="€" height={210} />
      </div>
    </div>
  );
};

export default PortfolioChart;
