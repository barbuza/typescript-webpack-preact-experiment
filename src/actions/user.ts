import { Store } from '../stores';
import { IAction } from '../support/actions';
import { signin, signup, saveUser } from '../api/userAPI';

export class SigninAction implements IAction<void> {
  constructor(protected email: string, protected password: string) {
  }

  public react(store: Store) {
    store.formsState.saving.set('signin', true);
    signin(this.email, this.password).then(result => {
      store.formsState.saving.set('signin', false);
      store.auth.user = result.user;
      store.auth.auth = result.auth;
    });
  }
}

export class SignupAction implements IAction<void> {
  constructor(protected name: string, protected email: string, protected password: string) {
  }

  public react(store: Store) {
    store.formsState.saving.set('signup', true);
    signup(this.name, this.email, this.password).then(result => {
      store.formsState.saving.set('signup', false);
      store.auth.user = result.user;
      store.auth.auth = result.auth;
    });
  }
}

export class EditAction implements IAction<void> {
  constructor(protected user: IUser) {
  }

  public react(store: Store) {
    store.formsState.saving.set('profile', true);
    saveUser(this.user, (store.auth.auth as IAuth).token).then(result => {
      store.formsState.saving.set('profile', false);
      store.auth.user = result.user;
      if (result.auth) {
        store.auth.auth = result.auth;
      }
      store.routing.redirect('/profile');
    });
  }
}

export class LogoutAction implements IAction<void> {
  public react(store: Store) {
    store.auth.user = null;
    store.routing.redirect('/');
  }
}
