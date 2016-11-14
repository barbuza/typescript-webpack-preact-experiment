import { Auth, IUser } from './auth';
import { Routing } from './routing';
import { StaticRoute, DynamicRoute } from '../support/routing';

interface IStoreOptions {
  path: string;
  routes: Array<StaticRoute<{}> | DynamicRoute<{}, {}>>;
  user: IUser | null;
};

export class Store {
  public readonly auth: Auth;
  public readonly routing: Routing;

  constructor(options: IStoreOptions) {
    this.auth = new Auth(options.user);
    this.routing = new Routing(options.path, options.routes);
  }
}
