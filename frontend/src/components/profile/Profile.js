import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { BigNumber as BN } from 'bignumber.js';

import UserForm from '../shared/UserForm';
import Spinner from '../shared/Spinner';

import Invest from 'assets/invest.svg';
import Withdraw from 'assets/withdraw.svg';

import { CurrencyContext } from 'context/CurrencyContext';

function MainAbout() {
  const { currencyState, euroEqualsCurencyState } = useContext(CurrencyContext);
  const [currency] = currencyState;
  const [euroEqualsCurency] = euroEqualsCurencyState;

  const [users, setUsers] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState('invest');

  useEffect(() => {
    let isMounted = true;
    axios
      .get('/v1/users')
      .then((res) => {
        if (isMounted) {
          console.log(res.data);
          let convertedData = res.data;
          if (currency !== 'EUR') {
            convertedData = res.data.map((element) => {
              element.fund_x = +BN(element.fund_x).multipliedBy(
                BN(euroEqualsCurency)
              );
              element.fund_y = +BN(element.fund_y).multipliedBy(
                BN(euroEqualsCurency)
              );
              element.fund_500 = +BN(element.fund_500).multipliedBy(
                BN(euroEqualsCurency)
              );
              return element;
            });
          }
          setUsers(convertedData);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isMounted = false;
    };
  }, [currency, euroEqualsCurency]);

  const modalActiveHandler = (user, m) => {
    setModalActive((prevState) => (prevState === true ? false : true));
    setSelectedUser(user);
    setMode(m);
  };

  return (
    <div className="profile">
      <h2>Profile.</h2>
      <br />
      <h3>You can add or withdraw funds here.</h3>
      <div className="profile__rows">
        {users && users.length ? (
          users
            .sort((a, b) => a.first_name.localeCompare(b.first_name))
            .map((user) => (
              <li key={user.email}>
                <div className="profile__rows__row">
                  <div className="profile__rows__row__left">
                    <p>
                      <span>{'Name: '}</span>
                      {user.first_name + ' ' + user.last_name}
                    </p>
                    <p>
                      <span>{'Email: '}</span>
                      {user.email}
                    </p>
                    <br />
                    <p id="active">Active Investments:</p>
                    <p>
                      <span>{'EQT X: '}</span>
                      {+user.fund_x !== 0 ? `${+user.fund_x} ${currency}` : '-'}
                    </p>
                    <p>
                      <span>{'EQT Y: '}</span>
                      {+user.fund_y !== 0 ? `${+user.fund_y} ${currency}` : '-'}
                    </p>
                    <p>
                      <span>{'EQT 500: '}</span>
                      {+user.fund_500 !== 0
                        ? `${+user.fund_500} ${currency}`
                        : '-'}
                    </p>
                  </div>
                  <div className="profile__rows__row__right">
                    <div className="profile__rows__row__right__invest">
                      <p onClick={(e) => modalActiveHandler(user, 'invest', e)}>
                        <img src={Invest} alt={`invest ${user.email}`} />
                        {' invest'}
                      </p>
                      {modalActive && (
                        <div className="overlay" onClick={modalActiveHandler} />
                      )}
                    </div>
                    <div className="profile__rows__row__right__withdraw">
                      <p
                        onClick={(e) => modalActiveHandler(user, 'withdraw', e)}
                      >
                        <img src={Withdraw} alt={`withdraw ${user.email}`} />
                        {' withdraw'}
                      </p>
                      {modalActive && (
                        <div className="overlay" onClick={modalActiveHandler} />
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))
        ) : users === 'none' ? (
          <p>No users have been found.</p>
        ) : (
          <Spinner />
        )}
      </div>
      {modalActive && (
        <>
          <div className="modal">
            <svg
              height="15px"
              viewBox="0 0 329.26933 329"
              width="15px"
              xmlns="http://www.w3.org/2000/svg"
              fill="#e0e0e0"
              alt="close"
              onClick={modalActiveHandler}
            >
              <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
            </svg>
            <UserForm
              {...selectedUser}
              passedMethod="PUT"
              mode={mode}
              conversionRate={euroEqualsCurency}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default MainAbout;
