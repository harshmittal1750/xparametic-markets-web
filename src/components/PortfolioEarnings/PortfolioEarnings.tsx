import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PortfolioEarnings = () => {
  function generateDayWiseTimeSeries(baseval: any, count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
  var data = generateDayWiseTimeSeries(new Date('15 Jul 2023').getTime(), 115, {
    min: 10,
    max: 20
  });

  const options1 = {
    options: {
      chart: {
        id: 'basic-area',
        toolbar: {
          show: false
        }
      }
    },
    series: [
      {
        name: 'series-1',
        data: [10, 40, 45, 5, -2, 60, 10, 11]
      }
    ],
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0
      }
    },
    markers: {
      size: 5,
      colors: ['#000524'],
      strokeColor: '#00BAEC',
      strokeWidth: 3
    },
    xaxis: {
      type: 'datetime'
    }
  };
  var options2 = {
    options: {
      chart: {
        id: 'basic-area',
        toolbar: {
          show: false
        }
      }
    },
    chart: {
      id: 'chart1',
      height: 130,
      type: 'bar',
      foreColor: '#ccc',
      brush: {
        target: 'chart2',
        enabled: true
      },
      selection: {
        enabled: true,
        fill: {
          color: '#fff',
          opacity: 0.4
        },
        xaxis: {
          min: new Date('27 Jul 2023 10:00:00').getTime(),
          max: new Date('14 Aug 2023 10:00:00').getTime()
        }
      }
    },
    colors: ['#FF0080'],
    series: [
      {
        data: data
      }
    ],
    stroke: {
      width: 2
    },
    grid: {
      borderColor: '#444'
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      tickAmount: 1,
      labels: {
        show: false
      }
    },
    fill: {
      colors: ['#F44336', '#E91E63', '#9C27B0']
    }
  };

  return (
    <>
      <Chart
        options={options1.options}
        series={options1.series}
        type="area"
        height={400}
      />
      <Chart
        options={options2.options}
        series={options2.series}
        type="bar"
        height={200}
      />
    </>
  );
};

export default PortfolioEarnings;
