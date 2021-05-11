import React from 'react';

function Footer() {
  return (
    <div className="footer">
      <span className="footer__year">© {new Date().getFullYear()} Invest</span>
    </div>
  );
}

export default Footer;
