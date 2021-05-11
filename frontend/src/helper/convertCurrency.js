const convertCurrency = (data, currency, euroEqualsCurrency, euroEqualsSEK) => {
  if (currency === 'EUR') {
    data = data.map((element) => {
      if (element.currency === 'SEK') {
        if (typeof element.amount !== 'number') {
          element.amount = +element.amount;
        }
        element.amount = (element.amount / euroEqualsSEK) * euroEqualsCurrency;
      }
      return element;
    });
  }
  if (currency === 'SEK') {
    data = data.map((element) => {
      if (element.currency === 'EUR') {
        if (typeof element.amount !== 'number') {
          element.amount = +element.amount;
        }
        element.amount = element.amount * euroEqualsSEK;
      }
      return element;
    });
  }
  if (currency !== 'EUR' && currency !== 'SEK') {
    data = data.map((element) => {
      if (element.currency === 'EUR') {
        if (typeof element.amount !== 'number') {
          element.amount = +element.amount;
        }
        element.amount = element.amount * euroEqualsCurrency;
        element.currency = currency;
      }
      if (element.currency === 'SEK') {
        if (typeof element.amount !== 'number') {
          element.amount = +element.amount;
        }
        element.amount = (element.amount / euroEqualsSEK) * euroEqualsCurrency;
        element.currency = currency;
      }
      return element;
    });
  }
  return data;
};

export default convertCurrency;
