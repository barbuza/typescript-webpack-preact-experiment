/* tslint:disable:no-console */
import { IHistory } from 'history';
import { Auth, ISerliazed as IAuthSerialized } from './auth';
import { Routing, ISerialized as IRoutingSerialized } from './routing';
import { StaticRoute, DynamicRoute } from '../support/routing';
import { IAction } from '../support/actions';

interface IStoreOptions {
  path: string;
  routes: Array<StaticRoute<{}> | DynamicRoute<{}, {}>>;
  history: IHistory;
}

export interface ISerialized {
  auth: IAuthSerialized;
  routing: IRoutingSerialized;
}

export class Store {
  public readonly auth: Auth;
  public readonly routing: Routing;
  public readonly history: IHistory;

  constructor(serialized: ISerialized | null, options: IStoreOptions) {
    if (serialized) {
      this.auth = new Auth(serialized.auth);
      this.routing = new Routing(serialized.routing, options.path, options.routes, this);
    } else {
      this.auth = new Auth(null);
      this.routing = new Routing(null, options.path, options.routes, this);
    }
    this.history = options.history;

    this.history.listen(location => {
      this.routing.path = location.pathname;
    });
  }

  public toJSON(): ISerialized {
    return {
      auth: this.auth.toJSON(),
      routing: this.routing.toJSON()
    };
  }

  public emit<T>(action: IAction<T>): T {
    console.debug('%cEMIT', 'font-weight: bold; color: white; background: black; padding: 2px 3px 0 3px', action);
    return action.react(this);
  }
}
