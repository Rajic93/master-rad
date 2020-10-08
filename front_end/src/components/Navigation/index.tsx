
import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { withAccessControl } from '../../stores/Auth/AccessControl';

const Navigation = observer(() => {
  const Login = withAccessControl(
    <Link
      to='/login'
    >
      <span>login</span>
    </Link>,
    'login.link'
  );
  const Home = withAccessControl(
    <Link
      to='/home'
    >
      <span>home</span>
    </Link>,
    'home.link'
  );
  const Profile = withAccessControl(
    <Link
      to='/profile'
    >
      <span>profile</span>
    </Link>,
    'profile.link'
  );

  return (
    <React.Fragment>
      <h1>{window.location.pathname}</h1>
      <Link
        to='/'
      >
        <span>landing</span>
      </Link>
      <br/>
      <Login/>  
      <br/>
      <Home />
      <br/>
      <Profile />
    </React.Fragment>
  );
});

export default Navigation;
