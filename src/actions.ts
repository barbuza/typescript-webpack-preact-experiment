import Store from './stores';

export interface Action<T> {

  react(store: Store): T;

}

export class LoginAction implements Action<void> {

  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  react(store: Store) {
    store.auth.user = { name: this.name };
  }

}

export class LogoutAction implements Action<void> {

  react(store: Store) {
    store.auth.user = null;
  }

}
