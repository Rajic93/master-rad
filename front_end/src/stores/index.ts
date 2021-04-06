
import { createContext, useContext } from 'react';

import { AccessControl, defaultRules } from './Auth/AccessControl';
import { AuthenticationStatus } from './Auth/AuthenticationStatus';
import { Router, defaultRoutes } from './Navigation/Router';
import { UserInformation } from './User/Info';

interface Stores {
  accessControl: AccessControl;
};

const initStores = (): Stores => {
  const authStatus = new AuthenticationStatus();
  const userInfo = new UserInformation();
  const accessControl = new AccessControl(
    authStatus,
    defaultRules,
    userInfo,
  );
  const router = new Router(defaultRoutes, accessControl);

  // Global stores
  return {
    authStatus,
    userInfo,
    accessControl,
    router,
  };
};

const stores = initStores();

export default stores;

export const storesContext = createContext(stores);

export const useStores = () => useContext(storesContext);
