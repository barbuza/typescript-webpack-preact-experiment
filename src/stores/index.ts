import { Auth } from './auth';
import { Routing } from './routing';
import { StaticRoute, DynamicRoute } from '../support/routing';

export class Store {
  public readonly auth: Auth;
  public readonly routing: Routing;

  constructor(path: string, routes: Array<StaticRoute<{}> | DynamicRoute<{}, {}>>) {
    this.auth = new Auth();
    this.routing = new Routing(path, routes);
  }
}
