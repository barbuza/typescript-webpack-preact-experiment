import Auth from './auth';
import Routing from './routing';

export default class Store {
  public readonly auth: Auth;
  public readonly routing: Routing;

  constructor(path: string) {
    this.auth = new Auth();
    this.routing = new Routing(path);
  }
}
