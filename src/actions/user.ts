import { Store } from '../stores';
import { IAction } from '../support/actions';
import { login, saveUser } from '../api/userAPI';

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

export class EditAction implements IAction<void> {
  constructor(protected user: IUser) {
  }

  public react(store: Store) {
    saveUser(this.user, (store.auth.auth as IAuth).token).then(result => {
      store.auth.user = result.user;
      if (result.auth) {
        store.auth.auth = result.auth;
      }
      store.history.push('/profile');
    });
  }
}

export class LogoutAction implements IAction<void> {
  public react(store: Store) {
    store.auth.user = null;
  }
}
