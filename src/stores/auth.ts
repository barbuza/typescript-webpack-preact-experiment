import { observable, computed, reaction } from 'mobx';
import * as Cookies from 'js-cookie';

export function parseUser(userJSON: string | null): IUser | null {
  userJSON = userJSON || '';

  try {
      if (userJSON) {
        return JSON.parse(userJSON);
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
}

export class Auth {
  @observable public user: IUser | null;
  @observable public auth: IAuth | null;

  @computed
  public get authenticated() {
    return !!this.user;
  }

  constructor() {
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
}
