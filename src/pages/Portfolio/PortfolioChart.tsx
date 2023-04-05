import { useMemo } from 'react';

import { fromPriceChartToLineChartSeries } from 'helpers/chart';
import { roundNumber } from 'helpers/math';

import { CaretDownIcon, CaretUpIcon } from 'assets/icons';

import { AlertMini, AreaChart, Label, Text } from 'components';

import { useAppSelector } from 'hooks';

import { balance } from './mock';

export default function PortfolioChart() {
  const portfolio = useAppSelector(state => state.portfolio.portfolio);
  const holdingsChartData = useMemo(
    () => fromPriceChartToLineChartSeries(portfolio.holdingsChart),
    [portfolio.holdingsChart]
  );
  const hasHoldingsPerformance = portfolio.holdingsPerformance.change >= 0;
  const holdingsPerformanceColor = hasHoldingsPerformance
    ? 'success'
    : 'danger';

  if (!holdingsChartData.length)
    return (
      <AlertMini
        styles="outline"
        variant="information"
        description="There's no chart data available."
      />
    );

  return (
    <div className="portfolio-chart">
      <div className="portfolio-chart__header">
        <div className="portfolio-chart__header-balance">
          <Text as="h4" scale="heading" fontWeight="semibold" color="light">
            {roundNumber(portfolio.holdingsValue, 2)} €
          </Text>
          <Text as="span" scale="tiny" fontWeight="medium" color="dark-gray">
            Total Balance
          </Text>
        </div>
        <div
          className={`portfolio-chart__header-change--${balance.change.type}`}
        >
          <Label color={holdingsPerformanceColor}>
            {hasHoldingsPerformance ? <CaretUpIcon /> : <CaretDownIcon />}$
            {roundNumber(
              Math.abs(portfolio.holdingsPerformance.changePercent) * 100,
              2
            )}
            %
          </Label>
          <Text
            as="span"
            scale="body"
            fontWeight="semibold"
            color={holdingsPerformanceColor}
          >
            {roundNumber(portfolio.holdingsPerformance.change, 2)} €
          </Text>
        </div>
      </div>
      <div className="portfolio-chart__view">
        <AreaChart serie={holdingsChartData} ticker="€" height={210} />
      </div>
    </div>
  );
}
