import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('EUR'); // default Currency can be set here
  const [euroEqualsCurency, setEuroEqualsCurency] = useState('?');
  const [euroEqualsSEK, setEuroEqualsSEK] = useState('?');

  useEffect(() => {
    let isMounted = true;

    axios
      .get('http://data.fixer.io/api/latest', {
        params: { access_key: 'acc1455a3d99d2a86e54d8460d533a64' },
      })
      .then((res) => {
        if (isMounted) {
          setEuroEqualsCurency(res.data.rates[currency]);
          setEuroEqualsSEK(res.data.rates.SEK);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{
        currencyState: [currency, setCurrency],
        euroEqualsCurencyState: [euroEqualsCurency],
        euroEqualsSEKState: [euroEqualsSEK],
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
