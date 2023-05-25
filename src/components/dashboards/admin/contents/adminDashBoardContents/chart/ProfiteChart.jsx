/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const ProfiteChart = () => {
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: 'basic-bar',
        width: '100%',
      },
      xaxis: {
        categories: [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029],
      },
      fill: {
        colors: ['#848591', '#E91E63', '#9C27B0'],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [230, 540, 845, 250, 649, 260, 870, 491],
      },
    ],
  });
  return (
    <div className="rounded-sm  border border-stroke px-5 pt-7.5 pb-5 w-[40vw] md:w-[90vw] shadow-default dark:border-strokedark md:mr-[10vw] md:px-0 xl:col-span-8">
      <div>
        <span className="text-lg ml-24 uppercase py-4 font-medium mt-6">
          Revenue stats
        </span>
        <div id="chartTwo" className="ml-0 md:-ml-4">
          <Chart options={chart.options} series={chart.series} type="bar" />
        </div>
      </div>
      <div className="flex justify-center flex-row gap-2 pt-8">
        <div className="h-4 w-4 bg-slate-400" />
        <div className="-mt-1">Revenues</div>
      </div>
    </div>
  );
};
export default ProfiteChart;
