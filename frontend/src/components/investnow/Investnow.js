import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { BigNumber as BN } from 'bignumber.js';

import Dropdown from '../shared/Dropdown';
import Spinner from '../shared/Spinner';

import { sortOptions, sortFunds } from 'helper/sortFunds';
import abbreviateNumber from 'helper/abbreviateNumber';

import CardImage from 'assets/card-image.jpg';

import { CurrencyContext } from 'context/CurrencyContext';

function Investnow() {
  const { currencyState, euroEqualsCurencyState } = useContext(CurrencyContext);
  const [currency] = currencyState;
  const [euroEqualsCurency] = euroEqualsCurencyState;

  const [funds, setFunds] = useState([]);
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const [typeValue, setTypeValue] = useState(null);
  const [sortValue, setSortValue] = useState(null);

  useEffect(() => {
    let isMounted = true;

    axios
      .get('/v1/funds')
      .then((res) => {
        if (isMounted) {
          let convertedFunds = res.data;
          if (currency !== 'EUR') {
            convertedFunds = convertedFunds.map((element) => {
              if (typeof element.amount !== 'number') {
                element.current_worth_eur = +element.current_worth_eur;
              }
              element.current_worth_eur = +BN(
                element.current_worth_eur
              ).multipliedBy(BN(euroEqualsCurency));
              return element;
            });
          }
          setFunds(convertedFunds);
          setFilteredFunds(convertedFunds);

          let uniqueType = convertedFunds;
          uniqueType = uniqueType.filter(
            (v, i, a) => a.findIndex((t) => t.type === v.type) === i
          );
          setDropdownOptions(uniqueType);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isMounted = false;
    };
  }, [currency, euroEqualsCurency]);

  const onChangeSearchHandler = (event) => {
    setSearchTerm(event.target.value.trim());
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let filtered = [];
      if (searchTerm === '') {
        filtered = funds;
      }
      if (searchTerm !== '') {
        filtered = funds.filter((obj) => {
          return `${obj.name}`.toLowerCase().match(searchTerm.toLowerCase());
        });
      }
      if (typeValue) {
        filtered = filtered.filter((obj) => {
          return obj.type.toLowerCase() === typeValue.type.toLowerCase();
        });
      }
      setFilteredFunds(filtered);
    }
    return () => {
      isMounted = false;
    };
  }, [searchTerm, funds, typeValue]);

  return (
    <div className="investnow__wrapper">
      <div className="investnow__search">
        <div className="investnow__search__input--wrapper">
          <div className="investnow__search__name">
            <p>NAME</p>
            <input
              placeholder="Search by Name..."
              alt="searchInput"
              onChange={onChangeSearchHandler}
            />
          </div>
        </div>
        <div className="investnow__search__type">
          <p>TYPE</p>
          <Dropdown
            prompt="Search by Type..."
            options={dropdownOptions}
            id="id"
            label="type"
            value={typeValue}
            onChange={(val) => setTypeValue(val)}
            isArrowTrue={true}
          />
        </div>
        <div className="investnow__search__sort">
          <p>SORT</p>
          <Dropdown
            prompt="Sort by..."
            options={sortOptions}
            id="sortOption"
            label="sortOption"
            value={sortValue}
            onChange={(val) => setSortValue(val)}
            isArrowTrue={false}
          />
        </div>
      </div>
      <div className="investnow">
        {filteredFunds && filteredFunds.length ? (
          sortFunds(filteredFunds, sortValue).map((fund) => (
            <div className="investnow__items" key={fund.id}>
              <img src={CardImage} alt="Card Header" />
              <p className="investnow__name">
                {fund.name} ({abbreviateNumber(fund.current_worth_eur)}{' '}
                <span>{currency}</span>)
              </p>
              <p className="investnow__type">{fund.type.toUpperCase()}</p>
              <p className="investnow__description">
                {fund.description} Lorem ipsum dolor sit amet quis nostrud
                exercitation ullamco laboris.
              </p>
              <div className="investnow__button">
                <button>Invest</button>
              </div>
            </div>
          ))
        ) : !filteredFunds.length && funds.length ? (
          <p>No funds have been found.</p>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Investnow;
