
import { action, observable, computed } from 'mobx';
import { Route } from './types';

import routes from './routes';
import { AccessControl } from '../Auth/AccessControl';

export const defaultRoutes = routes;

export class Router {
  @observable routes: Route[] = [];

  accessControl: AccessControl;

  authStatus: Record<string, any>;

  constructor(defaultRoutes: Route[] = [], accessControl: AccessControl, authStatus: any) {
    this.routes = defaultRoutes;
    this.accessControl = accessControl;
    this.authStatus = authStatus;
  }

  @computed get allowedRoutes() {
    return this.routes;
    // return this.routes
    //   .filter(route => this.authStatus?.isAuthenticated
    //     && route.isPublic && !route.isPublic
    //     || !this.authStatus.isAuthenticated && route.is_unauthenticated)
    // return this.routes.filter(({ isPublic, key }) => this.accessControl.isAuthenticated
    //   && this.accessControl.isAuthorized(key)
    //   || isPublic);
  }

  @action notify(routes = []) {
    this.routes = routes.filter(({ rule_type: type }) => type === 'page');
  }
}
