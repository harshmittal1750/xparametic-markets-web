import { AreaChart, Area as RechartsArea } from 'recharts';

import { AreaDataPoint } from './Area.type';
import { colorVariants } from './Area.util';

type AreaProps = {
  id: string;
  width?: number;
  height?: number;
  data: AreaDataPoint[];
  color: 'green' | 'red';
};

function Area({ id, width = 100, height = 50, data, color }: AreaProps) {
  const colorVariant = colorVariants[color];

  return (
    <AreaChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      }}
      style={{
        cursor: 'pointer'
      }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="5%"
            stopColor={colorVariant.startStop}
            stopOpacity={0.43}
          />
          <stop
            offset="95%"
            stopColor={colorVariant.endStop}
            stopOpacity={0.1}
          />
        </linearGradient>
      </defs>
      <RechartsArea
        type="linear"
        dataKey="y"
        stroke={`${colorVariant.stroke}57`}
        fillOpacity={1}
        fill={`url(#${id})`}
      />
    </AreaChart>
  );
}

export default Area;
