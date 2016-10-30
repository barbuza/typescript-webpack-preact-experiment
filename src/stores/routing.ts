import { observable, computed, asMap, autorun, asReference, transaction } from 'mobx';
import { merge } from '../utils';
import { routes, StaticRoute, DynamicRoute } from '../routes';
import { h } from 'preact';

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

export default class Routing {

  @observable
  public path: string;

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
      return h(this.component, this.data);
    }
    return null;
  }

  @computed
  protected get data(): {} | null {
    if (this.match && this.fetcher.data) {
      return merge(this.match.args, this.fetcher.data);
    }
    return null;
  }

  @computed
  protected get component(): preact.ComponentConstructor<{}, {}> | null {
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
    for (const route of routes) {
      const args = match(this.path, route.pattern);
      if (args) {
        return { route, args };
      }
    }
    return null;
  }

  protected required = {} as { [key: string]: boolean };

  constructor(path: string) {
    this.path = path;
    autorun(this.resolve.bind(this));
    autorun(this.fetch.bind(this));
  }

  protected resolve() {
    const match = this.match;
    if (match) {
      if (!this.required[match.route.key]) {
        this.required[match.route.key] = true;
        if (match.route instanceof StaticRoute) {
          match.route.load(mod => {
            this.modules.set(match.route.key, {
              component: asReference(mod.component),
              fetchData: asReference(mod.fetchData),
            });
          });
        } else if (match.route instanceof DynamicRoute) {
          match.route.load(mod => {
            this.modules.set(match.route.key, {
              component: asReference(mod.component),
              fetchData: asReference(mod.fetchData),
            });
          });
        }
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
            mod.fetchData(data => {
              if (this.fetcher.path === path) {
                this.fetcher.data = data;
              }
            });
          }
        } else if (this.match.route instanceof DynamicRoute) {
          const mod = this.modules.get(this.match.route.key) as IDynamicPageModule<{}, {}>;
          if (mod.fetchData) {
            mod.fetchData(this.match.args, data => {
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
