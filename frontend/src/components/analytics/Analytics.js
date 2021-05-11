import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { format, parseISO, subMonths } from 'date-fns';
import { BigNumber as BN } from 'bignumber.js';

import CustomTooltip from './CustomTooltip';
import Chart from './Chart';

import abbreviateNumber from 'helper/abbreviateNumber';
import convertCurrency from 'helper/convertCurrency';

import { CurrencyContext } from 'context/CurrencyContext';

function Analytics() {
  const { currencyState, euroEqualsCurencyState, euroEqualsSEKState } =
    useContext(CurrencyContext);
  const [currency] = currencyState;
  const [euroEqualsCurency] = euroEqualsCurencyState;
  const [euroEqualsSEK] = euroEqualsSEKState;

  const [monthly, setMonthly] = useState([]);
  const [lastMonthTotal, setLastMonthTotal] = useState(null);
  const [funds, setFunds] = useState(null);
  const [initTotal, setInitTotal] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(0);

  useEffect(() => {
    let isMounted = true;
    axios
      .get('/v1/funds')
      .then((res) => {
        if (isMounted) {
          setFunds(res.data);
          setInitTotal(res.data.reduce((a, b) => +a + +b.init_worth_eur, 0));
          setCurrentTotal(
            res.data.reduce((a, b) => +a + +b.current_worth_eur, 0)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    axios
      .get('/v1/fund_financials')
      .then((res) => {
        if (isMounted) {
          let fetchedData = res.data;

          fetchedData = convertCurrency(
            fetchedData,
            currency,
            euroEqualsCurency,
            euroEqualsSEK
          );

          function calculateMonthlyReturns(dataToCalculate, fundName) {
            let arr = [];
            dataToCalculate = dataToCalculate.filter(
              (data) => data.name === fundName
            );
            for (let num = 1; num < 13; num++) {
              let monthly = dataToCalculate.filter(
                (data) =>
                  data.created_at.substring(5, 7).replace(/^0+/, '') ===
                  num.toString()
              );
              let monthlyCredit = monthly.filter(
                (data) => data.type === 'CREDIT'
              );
              let monthlyDebit = monthly.filter(
                (data) => data.type === 'DEBIT'
              );

              let monthlySum =
                monthlyCredit.reduce((prev, current) => {
                  return +BN(+prev).plus(BN(+current.amount));
                }, 0) -
                monthlyDebit.reduce((prev, current) => {
                  return +prev + +current.amount;
                }, 0);
              arr.push({
                value: monthlySum,
              });
            }
            return arr;
          }

          let fY = calculateMonthlyReturns(fetchedData, 'EQT Y');
          let fX = calculateMonthlyReturns(fetchedData, 'EQT X');
          let fFH = calculateMonthlyReturns(fetchedData, 'EQT 500');

          let mData = [];

          for (let num = 11; num >= 0; num--) {
            let actualMonth = subMonths(new Date(), num)
              .toISOString()
              .substring(5, 7)
              .replace(/^0+/, '');
            mData.push({
              date: subMonths(new Date(), num).toISOString().substr(0, 10),
              fundY: fY[+actualMonth - 1].value,
              fundX: fX[+actualMonth - 1].value,
              fund500: fFH[+actualMonth - 1].value,
            });
          }
          setMonthly(mData);
          setLastMonthTotal(mData[11]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isMounted = false;
    };
  }, [euroEqualsCurency, currency, euroEqualsSEK]);

  return (
    <div className="analytics">
      <br />
      <h1>
        <span>+</span>ANALYTICS
      </h1>
      <br />
      <br />
      {funds && (
        <div className="analytics__cards">
          <div className="analytics__cards__items">
            <h2 className="analytics__cards__name">INITIAL TOTAL</h2>
            <p className="analytics__cards__description">
              Initial total worth across all funds
            </p>
            <h2 className="analytics__cards__worth">
              <span>
                {abbreviateNumber(
                  currency !== 'EUR'
                    ? +BN(initTotal).multipliedBy(BN(euroEqualsCurency))
                    : initTotal
                )}{' '}
              </span>
              {currency}
            </h2>
          </div>
          <div className="analytics__cards__items">
            <h2 className="analytics__cards__name">CURRENT TOTAL</h2>
            <p className="analytics__cards__description">
              Current total worth across all funds
            </p>
            <h2 className="analytics__cards__worth">
              <span>
                {abbreviateNumber(
                  currency !== 'EUR'
                    ? +BN(currentTotal).multipliedBy(BN(euroEqualsCurency))
                    : currentTotal
                )}{' '}
              </span>
              {currency}
            </h2>
          </div>
          <div className="analytics__cards__items">
            <h2 className="analytics__cards__name">TOTAL PROFIT</h2>
            <p className="analytics__cards__description">
              Since the inception, across all funds
            </p>
            <h2 className="analytics__cards__worth">
              <span>
                {abbreviateNumber(
                  currency !== 'EUR'
                    ? BN(currentTotal)
                        .minus(BN(initTotal))
                        .multipliedBy(euroEqualsCurency)
                    : BN(currentTotal).minus(BN(initTotal))
                )}{' '}
              </span>
              {currency}
            </h2>
          </div>
          <div className="analytics__cards__items">
            <h2 className="analytics__cards__name">WORTH GAIN (%)</h2>
            <p className="analytics__cards__description">
              Since the inception, across all funds
            </p>
            <h2 className="analytics__cards__worth">
              <span>
                +
                {(+BN(currentTotal)
                  .dividedBy(BN(initTotal).dividedBy(100))
                  .minus(BN(100))).toFixed(2)}{' '}
              </span>
              %
            </h2>
          </div>
          <div className="analytics__cards__items">
            <h2 className="analytics__cards__name">PROFIT LAST MONTH</h2>
            <p className="analytics__cards__description">Across all funds</p>
            <h2 className="analytics__cards__worth">
              <span>
                {lastMonthTotal &&
                  abbreviateNumber(
                    +BN(lastMonthTotal.fundX)
                      .plus(BN(lastMonthTotal.fundY))
                      .plus(BN(lastMonthTotal.fund500))
                  )}{' '}
              </span>
              {currency}
            </h2>
          </div>
          <div className="analytics__cards__items">
            <h2 className="analytics__cards__name">LAST MONTH (%)</h2>
            <p className="analytics__cards__description">
              Total profit increase, across all funds
            </p>
            <h2 className="analytics__cards__worth">
              <span>
                +
                {lastMonthTotal &&
                  (
                    (currentTotal - initTotal) /
                      ((currentTotal -
                        initTotal -
                        ((currency !== 'EUR'
                          ? +BN(lastMonthTotal.fundX).dividedBy(
                              BN(euroEqualsCurency)
                            )
                          : lastMonthTotal.fundX) +
                          (currency !== 'EUR'
                            ? +BN(lastMonthTotal.fundY).dividedBy(
                                BN(euroEqualsCurency)
                              )
                            : lastMonthTotal.fundY) +
                          (currency !== 'EUR'
                            ? +BN(lastMonthTotal.fund500).dividedBy(
                                BN(euroEqualsCurency)
                              )
                            : lastMonthTotal.fund500))) /
                        100) -
                    100
                  ).toFixed(2)}{' '}
              </span>
              %
            </h2>
          </div>
        </div>
      )}
      <h3>INITIAL DISTRIBUTION OF FUNDS</h3>
      <Chart props={funds && funds} />
      <h3>FUND COMPARISON OF PROFITS IN THE PAST YEAR</h3>
      <br />
      <ResponsiveContainer width="95%" height={400}>
        <AreaChart data={monthly}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area dataKey="fundY" stroke="#2451B7" fill="url(#color)" />
          <Area dataKey="fundX" stroke="#FF6500" fill="url(#color)" />
          <Area dataKey="fund500" stroke="green" fill="url(#color)" />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickCount={12}
            tickFormatter={(str) => {
              const date = parseISO(str);
              if (Number.isNaN(date.getDate())) {
                return '';
              }
              return format(date, 'MMM');
            }}
          />

          <YAxis
            datakey="fundY"
            axisLine={false}
            tickLine={false}
            tickCount={8}
            tickFormatter={(number) => abbreviateNumber(number)}
          />

          <Tooltip content={<CustomTooltip currency={currency} />} />

          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Analytics;
