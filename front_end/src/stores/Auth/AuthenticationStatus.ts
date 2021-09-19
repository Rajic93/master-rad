import { EventEmitter } from 'events';
import { observable, computed, action } from 'mobx';

export class AuthenticationStatus {
  @observable token?: string;
  @observable role?: string;
  @observable recentlyRegistered: boolean = false;
  @observable userId?: number;

  constructor() {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const userId = sessionStorage.getItem('userId');

    this.token = token;
    this.role = role;
    this.userId = userId;
  }

  @computed get isAuthenticated(): boolean {
    return !!this.token;
  }

  @action authenticate({ token, role, id }): void {
    this.token = token;
    this.role = role;
    this.userId = id;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('userId', id);
  }

  @action invalidate(): void {
    this.token = null;
    this.role = null;
    this.recentlyRegistered = false;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');
    document.dispatchEvent(new Event('onLogout'))
  }

  @action setRecentlyRegistered(value) {
    this.recentlyRegistered = value;
  }
}
