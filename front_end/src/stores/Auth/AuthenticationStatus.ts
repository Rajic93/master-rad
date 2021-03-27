import { observable, computed, action } from 'mobx';

export class AuthenticationStatus {
  @observable token: string;
  @observable role: string;
  @observable recentlyRegistered: boolean;

  @computed get isAuthenticated(): boolean {
    return !!this.token;
  }

  @action authenticate({ token, role }): void {
    this.token = token;
    this.role = role;
  }

  @action invalidate(): void {
    this.token = null;
    this.role = null;
    this.recentlyRegistered = false;
  }

  @action setRecentlyRegistered(value) {
    this.recentlyRegistered = value;
  }
}
