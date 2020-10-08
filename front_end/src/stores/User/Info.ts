
import { observable, action } from 'mobx';

export enum AccessLevels {
  Intro = 0,
  Basic = 1,
  Premium = 2,
}

export interface UserInfo {
  accessGroup: string | null;
  status: number | null;
  accessLevel: AccessLevels | null;
}

export class UserInformation {
  @observable accessGroup: string;

  @observable status: number;

  @observable accessLevel: AccessLevels;
  
  @action update({
    accessGroup,
    status,
    accessLevel,
  }: UserInfo) {
    this.accessGroup = accessGroup;
    this.status = status;
    this.accessLevel = accessLevel;
  }

  @action reset() {
    this.accessGroup = null;
    this.status = null;
    this.accessLevel = null;
  }
}
