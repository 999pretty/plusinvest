import React from 'react';
import { Link } from 'react-router-dom';

import Art from 'assets/home-art.svg';

function Home() {
  return (
    <div className="home">
      <div className="home__welcome">
        <h1>+INVEST</h1>
        <h2>The place to invest.</h2>
        <p>Invest in our funds and watch your money grow.</p>
        <Link to="/investnow">
          <button>Invest Now</button>
        </Link>
      </div>
      <div className="home__art">
        <img src={Art} alt="art" />
      </div>
    </div>
  );
}

export default Home;
