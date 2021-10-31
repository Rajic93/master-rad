import { EventEmitter } from 'events';
import { observable, computed, action } from 'mobx';

export class AuthenticationStatus {
  @observable token?: string;
  @observable role?: string;
  @observable recentlyRegistered: boolean = false;
  @observable userId?: number;
  @observable clusterLabel?: number;

  constructor() {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const userId = sessionStorage.getItem('userId');
    const clusterLabel = sessionStorage.getItem('clusterLabel');

    this.token = token;
    this.role = role;
    this.userId = userId;
    this.clusterLabel = clusterLabel;
  }

  @computed get isAuthenticated(): boolean {
    return !!this.token;
  }

  @action authenticate({ token, role, id, clusterLabel }): void {
    this.token = token;
    this.role = role;
    this.userId = id;
    this.clusterLabel = clusterLabel;
    console.log({ token, role, id, clusterLabel })
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('userId', id);
    sessionStorage.setItem('clusterLabel', clusterLabel);
  }

  @action invalidate(): void {
    this.token = null;
    this.role = null;
    this.recentlyRegistered = false;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('clusterLabel');
    document.dispatchEvent(new Event('onLogout'))
  }

  @action setRecentlyRegistered(value) {
    this.recentlyRegistered = value;
  }
}
