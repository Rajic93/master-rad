
import React from 'react';

const Landing = React.lazy(() => import('../pages/Landing'));
const Login = React.lazy(() => import('../pages/Login'));
const Home = React.lazy(() => import('../pages/Home'));
const Profile = React.lazy(() => import('../pages/Profile'));

export default {
  'landing.page': Landing,
  'login.page': Login,
  'home.page': Home,
  'profile.page': Profile,
};
