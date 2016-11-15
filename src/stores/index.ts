/* tslint:disable:no-console */
import { Auth, IUser } from './auth';
import { Routing } from './routing';
import { StaticRoute, DynamicRoute } from '../support/routing';
import { IAction } from '../support/actions';

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
    this.routing = new Routing(options.path, options.routes, this);
  }

  public emit<T>(action: IAction<T>): T {
    console.debug('%cEMIT', 'font-weight: bold; color: white; background: black; padding: 2px 3px 0 3px', action);
    return action.react(this);
  }
}
