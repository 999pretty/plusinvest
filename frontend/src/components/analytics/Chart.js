import React, { useState, useContext } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

import RenderActiveShape from './RenderActiveShape';

import { CurrencyContext } from 'context/CurrencyContext';

function Chart() {
  const { currencyState, euroEqualsCurencyState } = useContext(CurrencyContext);
  const [currency] = currencyState;
  const [euroEqualsCurency] = euroEqualsCurencyState;

  const [activeIndex, setActiveIndex] = useState(0);

  let data = [];
  data = [
    {
      name: 'EQT X',
      value: currency !== 'EUR' ? 10000000000 * euroEqualsCurency : 10000000000,
    },
    {
      name: 'EQT Y',
      value: currency !== 'EUR' ? 10000000000 * euroEqualsCurency : 10000000000,
    },
    {
      name: 'EQT Z',
      value: currency !== 'EUR' ? 8000000000 * euroEqualsCurency : 8000000000,
    },
    {
      name: 'EQT A',
      value: currency !== 'EUR' ? 7000000000 * euroEqualsCurency : 7000000000,
    },
    {
      name: 'EQT B',
      value: currency !== 'EUR' ? 1000000000 * euroEqualsCurency : 1000000000,
    },
    {
      name: 'EQT C',
      value: currency !== 'EUR' ? 2000000000 * euroEqualsCurency : 2000000000,
    },
    {
      name: 'EQT 500',
      value: currency !== 'EUR' ? 2500000000 * euroEqualsCurency : 2500000000,
    },
    {
      name: 'EQT 1000',
      value: currency !== 'EUR' ? 3000000000 * euroEqualsCurency : 3000000000,
    },
  ];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={380} height={380}>
        <Pie
          activeIndex={activeIndex}
          activeShape={<RenderActiveShape currency={currency} />}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
          fill="#FF6500"
          dataKey="value"
          onMouseEnter={onPieEnter}
          currency={currency}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default Chart;
