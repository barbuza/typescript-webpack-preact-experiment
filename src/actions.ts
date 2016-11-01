import Store from './stores';

export interface IAction<T> {
  react(store: Store): T;
}

export class LoginAction implements IAction<void> {
  constructor(protected name: string) {
  }

  public react(store: Store) {
    store.auth.user = { name: this.name };
  }
}

export class LogoutAction implements IAction<void> {
  public react(store: Store) {
    store.auth.user = null;
  }
}
