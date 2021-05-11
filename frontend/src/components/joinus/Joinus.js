import React from 'react';

import UserForm from 'components/shared/UserForm';

function Joinus() {
  return (
    <div className="joinus">
      <h2>Become investor.</h2>
      <br />
      <h3>Join us by filling the form:</h3>
      <br />
      <UserForm passedMethod="POST" />
    </div>
  );
}

export default Joinus;
