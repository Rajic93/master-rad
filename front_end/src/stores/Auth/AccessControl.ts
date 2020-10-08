
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { AuthenticationStatus } from './AuthenticationStatus'
import { AccessRule } from './types'
import defaultAccessRules from './defaultAccessRules'
import { useStores } from '../';

export const defaultRules = defaultAccessRules;

const ALLOW_UNKNOWN_ACCESS_RULES = false;

export class AccessControl {
  @observable authStatus: AuthenticationStatus;
  @observable accessRules: AccessRule[];
  @observable userInfo: UserInfo;

  constructor(authStatus, accessRules, userInfo) {
    this.authStatus = authStatus;
    this.accessRules = accessRules;
    this.userInfo = userInfo;
  }

  isAuthorized(rule: string): boolean {
    const accessRule = this.accessRules.find(({ feature }) => feature === rule);
    if (!accessRule) {
      // invalid access rule - maybe here we should throw an error
      return ALLOW_UNKNOWN_ACCESS_RULES;
    }

    console.log({ accessRule });

    // The first level authorization
    if (accessRule.isPublic) {
      return true;
    }

    // The second level authorization
    if (!accessRule.accessGroups || !accessRule.accessGroups.includes(this.userInfo.accessGroup)) {
      return false
    }

    // The third level authorization
    if (this.userInfo.accessLevel < accessRule.accessLevel) {
      return false;
    }

    return true;
  }

  @computed get isAuthenticated(): boolean {
    return !!(this.authStatus && this.authStatus.isAuthenticated);
  }
}

export const withAccessControl = (Component, accessRule) => observer(() => {
  const { accessControl } = useStores();

  if (!accessControl.isAuthorized(accessRule)) {
    return null;
  }
  return Component;
});
