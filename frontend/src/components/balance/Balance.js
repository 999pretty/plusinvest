import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import Dropdown from '../shared/Dropdown';
import Spinner from '../shared/Spinner';

import convertCurrency from 'helper/convertCurrency';
import abbreviateNumber from 'helper/abbreviateNumber';

import { CurrencyContext } from 'context/CurrencyContext';

function About() {
  const { currencyState, euroEqualsCurencyState, euroEqualsSEKState } =
    useContext(CurrencyContext);
  const [currency] = currencyState;
  const [euroEqualsCurency] = euroEqualsCurencyState;
  const [euroEqualsSEK] = euroEqualsSEKState;

  const [financials, setFinancials] = useState([]);
  const [filteredFinancials, setFilteredFinancials] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const [fundInputValue, setFundInputValue] = useState(null);

  useEffect(() => {
    let isMounted = true;

    axios
      .get('/v1/fund_financials')
      .then((res) => {
        if (isMounted) {
          setFinancials(res.data);
          setFilteredFinancials(
            convertCurrency(
              res.data,
              currency,
              euroEqualsCurency,
              euroEqualsSEK
            )
          );
          let uniqueFunds = res.data;
          uniqueFunds = uniqueFunds.filter(
            (v, i, a) => a.findIndex((t) => t.name === v.name) === i
          );
          setDropdownOptions(uniqueFunds);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isMounted = false;
    };
  }, [currency, euroEqualsCurency, euroEqualsSEK]);

  function getDateMonthYear(fullDate) {
    fullDate = new Date(fullDate);
    let day = fullDate.getUTCDate();
    let month = fullDate.getUTCMonth() + 1;
    let year = fullDate.getUTCFullYear();
    return day + '/ ' + month + '/ ' + year;
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let filtered = financials;
      if (fundInputValue) {
        filtered = filtered.filter((obj) => {
          return obj.name.toLowerCase() === fundInputValue.name.toLowerCase();
        });
      }
      setFilteredFinancials(filtered);
    }
    return () => {
      isMounted = false;
    };
  }, [financials, fundInputValue]);

  return (
    <div className="balance">
      <br />
      <h2>Balance.</h2>
      <br />
      <h3>You can view recent changes of investment funds here.</h3>
      <br />
      <br />
      <p>FUND NAME</p>
      <Dropdown
        prompt="Select fund..."
        options={dropdownOptions}
        id="id"
        label="name"
        value={fundInputValue}
        onChange={(val) => setFundInputValue(val)}
        isArrowTrue={true}
      />
      <br />
      <div className="balance__rows">
        {filteredFinancials && filteredFinancials.length ? (
          filteredFinancials
            .sort(function (a, b) {
              return new Date(b.created_at) - new Date(a.created_at);
            })
            .map((financial) => (
              <li key={financial.id}>
                <div className="balance__rows__row">
                  <div className="balance__rows__row__left">
                    <p>
                      <span>{'Date: '}</span>
                      {getDateMonthYear(financial.created_at)}
                    </p>
                    <p className="balance__rows__row__left__name">
                      <span>{'Name: '}</span>
                      {financial.name}
                    </p>
                  </div>
                  <div className="balance__rows__row__right">
                    <div className="balance__rows__row__right__amount">
                      {financial.type === 'CREDIT' ? (
                        <p className="balance__rows__row__right__amount__positive">
                          {`▲ ${currency}: +${abbreviateNumber(
                            financial.amount
                          )}`}
                        </p>
                      ) : (
                        <p className="balance__rows__row__right__amount__negative">
                          {`▼ ${currency}: -${abbreviateNumber(
                            financial.amount
                          )}`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))
        ) : financials === 'none' ? (
          <p>No financials have been found.</p>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default About;
