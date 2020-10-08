
import React from 'react';
import { observer } from 'mobx-react';

const Test = observer(() => (
  <React.Fragment>
    <h1>Home</h1>
    <Link
      to='/'
    >
      <span>landing</span>
    </Link>
    <br/>
    <Link
      to='/profile'
    >
      <span>profile</span>
    </Link>
  </React.Fragment>
));

export default Test;
