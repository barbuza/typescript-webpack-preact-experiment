import Auth from './auth';
import Routing from './routing';

export default class MobxStore {
  public readonly auth = new Auth;
  public readonly routing = new Routing;
}
