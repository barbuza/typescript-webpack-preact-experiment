import { observable, computed, reaction } from 'mobx';

export interface IUser {
  name: string;
}

export default class AuthStore {
  @observable
  public user: IUser | null;

  @computed
  public get authenticated() {
    return !!this.user;
  }

  constructor() {
    try {
      const userJSON = localStorage.getItem('user');
      if (userJSON) {
        this.user = JSON.parse(userJSON);
      } else {
        this.user = null;
      }
    } catch (err) {
      this.user = null;
    }

    reaction(() => this.user, user => {
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (err) {
        console.warn("can't save user in local storage");
      }
    });
  }
}
