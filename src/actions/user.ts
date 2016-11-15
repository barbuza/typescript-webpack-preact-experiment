import { Store } from '../stores';
import { IAction } from '../support/actions';
import { login } from '../api/userAPI';

export class LoginAction implements IAction<void> {
  constructor(protected email: string, protected password: string) {
  }

  public react(store: Store) {
    login(this.email, this.password).then(result => {
      store.auth.user = result.user;
      store.auth.auth = result.auth;
      store.history.replace('/');
    });
  }
}

export class LogoutAction implements IAction<void> {
  public react(store: Store) {
    store.auth.user = null;
  }
}
