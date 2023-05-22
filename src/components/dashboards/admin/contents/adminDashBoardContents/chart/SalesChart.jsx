/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';

import Chart from 'react-apexcharts';

const SalesChart = () => {
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029],
      },
      fill: {
        colors: ['#708090', '#E91E63', '#9C27B0'],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });
  return (
    <div className="rounded-sm  border border-stroke px-5 pt-7.5 pb-5 w-[40vw] shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between sm:flex-nowrap" />
      <span className="text-lg ml-24 uppercase py-4 font-medium mt-6">
        sales stats
      </span>
      <div>
        <div id="chartOne" className="ml-10">
          <Chart
            options={chart.options}
            series={chart.series}
            type="bar"
            width="500"
          />
        </div>
        <div className="flex justify-center flex-row gap-2">
          <div className="h-4 w-4 bg-slate-500" />
          <div className="-mt-1">sales</div>
        </div>
      </div>
    </div>
  );
};
export default SalesChart;
