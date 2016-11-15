import * as React from 'react';
import { observable, computed, asMap, autorun, asReference, transaction } from 'mobx';
import { merge } from '../utils';
import { StaticRoute, DynamicRoute, IStaticPageModule, IDynamicPageModule } from '../support/routing';

import { Store } from './';

function match(path: string, pattern: string): {} | null {
  if (pattern.indexOf(':') === -1) {
    return path === pattern;
  }
  const pathChunks = path.split('/');
  const patternChunks = pattern.split('/');
  if (pathChunks.length !== patternChunks.length) {
    return null;
  }
  const result = {};
  for (let i = 0; i < pathChunks.length; i++) {
    if (patternChunks[i][0] === ':') {
      result[patternChunks[i].substr(1)] = pathChunks[i];
    } else if (patternChunks[i] !== pathChunks[i]) {
      return null;
    }
  }
  return result;
}

export enum RoutingState {
  READY,
  LOADING,
  FETCHING
}

interface IMatch {
  args: {};
  route: StaticRoute<{}> | DynamicRoute<{}, {}>;
}

export class Routing {
  @observable public path: string;
  /* tslint:disable */
  @observable protected _routes: Array<StaticRoute<{}> | DynamicRoute<{}, {}>>; // tslint-disable
  /* tslint:enable */
  @observable protected store: Store;

  public set routes(routes: Array<StaticRoute<{}> | DynamicRoute<{}, {}>>) {
    // this.fetcher.data = null;
    this.modules = asMap({} as { [key: string]: IStaticPageModule<{}> | IDynamicPageModule<{}, {}> });
    this._routes = routes;
  }

  @computed
  public get auth(): boolean {
    return this.store.auth.authenticated;
  }

  @computed
  public get state(): RoutingState {
    if (!this.component) {
      return RoutingState.LOADING;
    }
    if (!this.data) {
      return RoutingState.FETCHING;
    }
    return RoutingState.READY;
  }

  @computed
  public get route(): JSX.Element | null {
    if (this.data && this.component) {
      return React.createElement(this.component, this.data);
    }
    return null;
  }

  @computed
  protected get data(): {} | null {
    if (this.match && this.path === this.fetcher.path && this.fetcher.data) {
      return merge(this.match.args, this.fetcher.data);
    }
    return null;
  }

  @computed
  protected get component(): React.ComponentClass<{}> | null {
    if (this.match) {
      if (this.modules.has(this.match.route.key)) {
        return this.modules.get(this.match.route.key).component;
      }
    }
    return null;
  }

  @observable
  protected modules = asMap({} as { [key: string]: IStaticPageModule<{}> | IDynamicPageModule<{}, {}> });

  @observable
  protected fetcher = observable({
    data: asReference(null) as {} | null,
    path: null as string | null,
  });

  @computed
  protected get match(): IMatch | null {
    const auth = this.auth;
    for (const route of this._routes) {
      let args = null as {} | null;
      const matchAuth = route.auth === undefined || route.auth === auth;
      if ((route instanceof StaticRoute) && this.path === route.pattern && matchAuth) {
        args = {};
      } else if ((route instanceof DynamicRoute)) {
        args = matchAuth ? match(this.path, route.pattern) : null;
      }
      if (args) {
        return { route, args };
      }
    }
    return null;
  }

  constructor(path: string, routes: Array<StaticRoute<{}> | DynamicRoute<{}, {}>>, store: Store) {
    this.path = path;
    this.store = store;
    this._routes = routes;
    autorun(this.resolve.bind(this));
    autorun(this.fetch.bind(this));
  }

  protected resolve() {
    const match = this.match;
    if (match) {
      if (match.route instanceof StaticRoute) {
        match.route.load().then(mod => {
          this.modules.set(mod.key || '', {
            component: asReference(mod.component),
            fetchData: asReference(mod.fetchData),
          });
        });
      } else if (match.route instanceof DynamicRoute) {
        match.route.load().then(mod => {
          this.modules.set(mod.key || '', {
            component: asReference(mod.component),
            fetchData: asReference(mod.fetchData),
          });
        });
      }
    }
  }

  protected fetch() {
    const path = this.path;
    if (this.path && this.match && this.modules.get(this.match.route.key) && path !== this.fetcher.path) {
      const fetchData = this.modules.get(this.match.route.key).fetchData;
      if (!fetchData) {
        transaction(() => {
          this.fetcher.path = path;
          this.fetcher.data = {};
        });
      } else {
        transaction(() => {
          this.fetcher.path = path;
          this.fetcher.data = null;
        });
        if (this.match.route instanceof StaticRoute) {
          const mod = this.modules.get(this.match.route.key) as IStaticPageModule<{}>;
          if (mod.fetchData) {
            mod.fetchData(this.store).then(data => {
              if (this.fetcher.path === path) {
                this.fetcher.data = data;
              }
            });
          }
        } else if (this.match.route instanceof DynamicRoute) {
          const mod = this.modules.get(this.match.route.key) as IDynamicPageModule<{}, {}>;
          if (mod.fetchData) {
            mod.fetchData(this.match.args, this.store).then(data => {
              if (this.fetcher.path === path) {
                this.fetcher.data = data;
              }
            });
          }
        }
      }
    }
  }
}
