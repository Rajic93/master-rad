
import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const Test = observer(() => (
  <React.Fragment>
    <h1>Profile</h1>
    <Link
      to='/'
    >
      <span>landing</span>
    </Link>
    <br/>
    <Link
      to='/home'
    >
      <span>home</span>
    </Link>
  </React.Fragment>
));

export default Test;
