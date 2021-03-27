
import React from 'react';

const Landing = React.lazy(() => import('../pages/Landing'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Home = React.lazy(() => import('../pages/Home'));
const Profile = React.lazy(() => import('../pages/Profile'));
const Affinities = React.lazy(() => import('../pages/Affinities'));

export default {
  'landing.page': Landing,
  'login.page': Login,
  'register.page': Register,
  'home.page': Home,
  'profile.page': Profile,
  'affinities.page': Affinities,
};
