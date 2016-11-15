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

    reaction(() => this.user, userObject => {
      try {
        Cookies.set('user', JSON.stringify(userObject));
      } catch (err) {
        console.warn("can't save user in local storage");
      }
    });
  }
}
