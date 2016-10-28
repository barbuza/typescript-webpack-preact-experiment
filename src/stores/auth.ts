import { observable, computed } from 'mobx';

export interface IUser {
  name: string;
}

export default class AuthStore {

  @observable
  user: IUser | null = null;

  @computed
  get authenticated() {
    return !!this.user;
  }

}
