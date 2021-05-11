import React, { useEffect, useState, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { BigNumber as BN } from 'bignumber.js';

import { CurrencyContext } from 'context/CurrencyContext';

function UserForm(passedUser, passedMethod, mode) {
  const { currency } = useContext(CurrencyContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const history = useHistory();

  const inputRef = useRef();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      inputRef.current.focus();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const onSubmit = (data, event) => {
    event.preventDefault();
    setDisabledSubmit(true);

    let endpoint, method, payload, callback;
    if (passedUser.passedMethod === 'PUT') {
      method = axios.put;
      endpoint = `/v1/user_${passedUser.mode}`;
      if (currency !== 'EUR') {
        data.fund_x = +BN(data.fund_x).dividedBy(BN(passedUser.conversionRate));
        data.fund_y = +BN(data.fund_y).dividedBy(BN(passedUser.conversionRate));
        data.fund_500 = +BN(data.fund_500).dividedBy(
          BN(passedUser.conversionRate)
        );
      }

      payload = {
        email: passedUser.email,
        fund_x: data.fund_x === '' || isNaN(data.fund_x) ? 0 : +data.fund_x,
        fund_y: data.fund_y === '' || isNaN(data.fund_y) ? 0 : +data.fund_y,
        fund_500:
          data.fund_500 === '' || isNaN(data.fund_500) ? 0 : +data.fund_500,
      };
      callback = history.push('/balance');
    } else {
      method = axios.post;
      endpoint = '/v1/user';
      payload = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      };
      callback = history.push('/profile');
    }

    method(endpoint, payload)
      .then((res) => {
        callback();
      })
      .catch((err) => {
        setErrorMessage('Invalid input.');
      });
  };

  return (
    <>
      {passedUser.passedMethod === 'PUT' ? (
        <div className="uf__header">
          <h3>
            {`${passedUser.first_name} 
        ${passedUser.last_name}`}
          </h3>
        </div>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        {passedUser.passedMethod === 'PUT' ? (
          <div className="uf__form">
            <br />
            <h5>
              Choose the amount to
              <span>
                {passedUser.mode === 'invest' ? ' Invest.' : ' Withdraw.'}
              </span>
            </h5>
            <br />
            {errors.fund_x && <p>EQT X field is invalid</p>}
            {errors.fund_y && <p>EQT Y field is invalid</p>}
            {errors.fund_500 && <p>EQT 500 field is invalid</p>}
            <p className="LoginText" style={{ color: 'red' }}>
              {errorMessage}
            </p>
            <div className="uf__form__input">
              <span>EQT X: </span>
              <input
                type="number"
                placeholder="EQT X"
                name="fund_x"
                alt="EQT X"
                {...register('fund_x', {
                  required: false,
                  minLength: 3,
                  maxLength: 20,
                })}
                ref={(e) => {
                  inputRef.current = e;
                }}
              />
              <span>EQT Y: </span>
              <input
                type="number"
                placeholder="EQT Y"
                name="fund_y"
                alt="EQT Y"
                {...register('fund_y', {
                  required: false,
                  minLength: 3,
                  maxLength: 20,
                })}
              />
              <span>EQT 500: </span>
              <input
                type="number"
                placeholder="EQT 500"
                name="fund_500"
                alt="EQT 500"
                {...register('fund_500', {
                  required: false,
                  minLength: 3,
                  maxLength: 20,
                })}
              />
              <button type="submit" disabled={disabledSubmit && true}>
                <span>SUBMIT FORM</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="uf__form">
            {errors.first_name && <p>First Name is invalid</p>}
            {errors.last_name && <p>Last Name is invalid</p>}
            {errors.email && <p>Address is invalid</p>}
            <p className="LoginText" style={{ color: 'red' }}>
              {errorMessage}
            </p>
            <div className="uf__form__input">
              <input
                type="text"
                placeholder="First name"
                name="first_name"
                alt="First Name"
                {...register('first_name', {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                })}
                ref={(e) => {
                  inputRef.current = e;
                }}
              />
              <input
                type="text"
                placeholder="Last name"
                name="last_name"
                alt="Last Name"
                {...register('last_name', {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                })}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                alt="Email"
                {...register('email', {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
              />
              <button type="submit" disabled={disabledSubmit && true}>
                <span>SUBMIT FORM</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default UserForm;
