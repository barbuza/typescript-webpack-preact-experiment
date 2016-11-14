import { observable, computed, reaction } from 'mobx';
import * as Cookies from 'js-cookie';

export interface IUser {
  name: string;
}

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
  @observable
  public user: IUser | null;

  @computed
  public get authenticated() {
    return !!this.user;
  }

  constructor(user: IUser | null) {
    this.user = user;

    reaction(() => this.user, user => {
      try {
        Cookies.set('user', JSON.stringify(user));
        // localStorage.setItem('user', JSON.stringify(user));
      } catch (err) {
        console.warn("can't save user in local storage");
      }
    });
  }
}
