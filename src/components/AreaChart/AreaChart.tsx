import { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';

import dayjs from 'dayjs';

import { useTheme } from 'hooks';

import generateCustomOptions from './options';

type Event = {
  x: dayjs.Dayjs;
  y: number;
};

type AreaChartProps = {
  serie: Event[];
  ticker: string;
  height?: number | string;
  showGrid?: boolean;
};

const AreaChart = ({
  serie,
  ticker,
  height = 200,
  showGrid = true
}: AreaChartProps) => {
  const { theme } = useTheme();
  const customOptions = useMemo(
    () => generateCustomOptions(theme, ticker, showGrid),
    [theme, ticker, showGrid]
  );

  return (
    <ReactApexChart
      options={customOptions}
      series={[{ data: serie }]}
      type="area"
      height={height}
    />
  );
};

export default AreaChart;
