
import { observable, computed, action } from 'mobx';

export class AuthenticationStatus {
  @observable role: string;
  @observable role: string;

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
  }
}
