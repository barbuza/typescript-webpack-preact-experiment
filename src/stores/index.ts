import Auth from './auth';
import Routing from './routing';

export default class Store {
  public readonly auth = new Auth;
  public readonly routing = new Routing;
}
