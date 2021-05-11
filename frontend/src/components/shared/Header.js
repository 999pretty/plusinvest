import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Sun from 'assets/sun.svg';
import Moon from 'assets/moon.svg';
import { ThemeContext } from 'context/ThemeContext';
import { CurrencyContext } from 'context/CurrencyContext';

import Bars from 'assets/bars.svg';

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { currencyState } = useContext(CurrencyContext);
  const [currency, setCurrency] = currencyState;

  const [sidebarActive, setSidebarActive] = useState(false);

  let sidebarClasses = ['sidebar', 'close'];
  if (sidebarActive) {
    sidebarClasses = ['sidebar', 'open'];
  }

  return (
    <>
      <div className={sidebarClasses.join(' ')}>
        <div className="sidebar__close">
          <svg
            height="15px"
            viewBox="0 0 329.26933 329"
            width="15px"
            xmlns="http://www.w3.org/2000/svg"
            fill="#e0e0e0"
            alt="close"
            onClick={() => setSidebarActive(false)}
          >
            <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
          </svg>
        </div>
        <ul>
          <li>
            <NavLink className="sidebar__logo" alt="Sidebar Home" to="/">
              <span>+</span>INVEST
            </NavLink>
          </li>
          <li>
            <NavLink className="sidebar__links" alt="Sidebar About" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              className="sidebar__links"
              alt="Sidebar Profile"
              to="/profile"
            >
              Profile
            </NavLink>{' '}
          </li>
          <li>
            <NavLink
              className="sidebar__links"
              alt="Sidebar Balance"
              to="/balance"
            >
              Balance
            </NavLink>{' '}
          </li>
          <li>
            <NavLink
              className="sidebar__links"
              alt="Sidebar Analytics"
              to="/analytics"
            >
              Analytics
            </NavLink>{' '}
          </li>
          <li>
            <NavLink
              className="sidebar__links"
              alt="Sidebar Join Us"
              to="/joinus"
            >
              Join Us
            </NavLink>{' '}
          </li>
          <li>
            <NavLink
              className="sidebar__links"
              alt="Sidebar Invest Now"
              to="/investnow"
              id="navbutton"
            >
              Invest Now
            </NavLink>
          </li>
          <li>
            {theme === 'darkTheme' ? (
              <img
                src={Sun}
                alt="Sidebar light theme"
                onClick={() => setTheme('lightTheme')}
              />
            ) : (
              <img
                src={Moon}
                alt="Sidebar dark theme"
                onClick={() => setTheme('darkTheme')}
              />
            )}
            <select
              name="currency"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            >
              <option id="0">EUR</option>
              <option id="1">SEK</option>
            </select>
          </li>
        </ul>
      </div>
      <nav className="navbar">
        <NavLink className="navbar__logo" alt="Home" to="/">
          <span>+</span>INVEST
        </NavLink>
        <img
          className="navbar__bars"
          src={Bars}
          alt="bars"
          onClick={() => setSidebarActive(true)}
        />
        <div className="navbar__menu">
          {theme === 'darkTheme' ? (
            <img
              src={Sun}
              alt="light theme"
              onClick={() => setTheme('lightTheme')}
            />
          ) : (
            <img
              src={Moon}
              alt="dark theme"
              onClick={() => setTheme('darkTheme')}
            />
          )}
          <NavLink className="navbar__menu--links" alt="About" to="/about">
            About
          </NavLink>
          <NavLink className="navbar__menu--links" alt="Profile" to="/profile">
            Profile
          </NavLink>
          <NavLink className="navbar__menu--links" alt="Balance" to="/balance">
            Balance
          </NavLink>
          <NavLink
            className="navbar__menu--links"
            alt="Analytics"
            to="/analytics"
          >
            Analytics
          </NavLink>
          <NavLink className="navbar__menu--links" alt="Join Us" to="/joinus">
            Join Us
          </NavLink>
          <NavLink
            className="navbar__menu--links"
            alt="Invest Now"
            to="/investnow"
            id="navbutton"
          >
            Invest Now
          </NavLink>
          <select
            name="currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            <option id="0">EUR</option>
            <option id="1">SEK</option>
            <option id="2">USD</option>
          </select>
        </div>
      </nav>
    </>
  );
}

export default Header;
