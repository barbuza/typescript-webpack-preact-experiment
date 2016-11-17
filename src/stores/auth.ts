import { observable, computed, reaction, action, toJS } from 'mobx';
import * as Cookies from 'js-cookie';

export interface ISerliazed {
  user: IUser | null;
  auth: IAuth | null;
}

export class Auth {
  @observable public user: IUser | null;
  @observable public auth: IAuth | null;

  @computed
  public get authenticated() {
    return !!this.user;
  }

  constructor(serialized: ISerliazed | null) {
    if (serialized) {
      this.fromJSON(serialized);
    }
    reaction(() => ({ user: this.user, auth: this.auth }), res => {
      if (res.user && res.auth) {
        Cookies.set('user', {
          auth: res.auth,
          id: res.user.id,
        });
      } else {
        Cookies.remove('user');
      }
    });
  }

  @action
  protected fromJSON(serialized: ISerliazed) {
    this.user = serialized.user;
    this.auth = serialized.auth;
  }

  public toJSON(): ISerliazed {
    return {
      user: toJS(this.user || null),
      auth: toJS(this.auth || null),
    };
  }
}
