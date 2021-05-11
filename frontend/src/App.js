import React, { useContext } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Profile from './pages/ProfilePage';
import JoinUs from './pages/JoinusPage';
import Investnow from './pages/InvestnowPage';
import Balance from './pages/BalancePage';
import Analytics from './pages/AnalyticsPage';

import 'scss/app.scss';

import { ThemeContext } from 'context/ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme === 'darkTheme' ? 'darkTheme' : 'lightTheme'}>
      <div className="App">
        <Switch>
          <Route path="/about" exact component={About} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/joinus" exact component={JoinUs} />
          <Route path="/investnow" exact component={Investnow} />
          <Route path="/balance" exact component={Balance} />
          <Route path="/analytics" exact component={Analytics} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
