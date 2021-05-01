import { observable, computed, action } from 'mobx';

export class AuthenticationStatus {
  @observable token: string;
  @observable role: string;
  @observable recentlyRegistered: boolean;
  @observable userId: number;

  @computed get isAuthenticated(): boolean {
    return !!this.token;
  }

  @action authenticate({ token, role, id }): void {
    this.token = token;
    this.role = role;
    this.userId = id;
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
