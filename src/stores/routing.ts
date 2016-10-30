import { observable, computed, asMap, autorun, asReference, transaction } from 'mobx';
import routes from '../routes';

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

interface IRoute extends IPageConfig {
  args: {};
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
  public get data(): {} | null {
    if (this.fetcher.path && this.path === this.fetcher.path && this.fetcher.data) {
      return this.fetcher.data;
    }
    return null;
  }

  @computed
  public get component(): preact.ComponentConstructor<{}, {}> | null {
    if (this.route) {
      if (this.modules.has(this.route.key)) {
        return this.modules.get(this.route.key).default;
      }
    }
    return null;
  }

  @computed
  public get args(): {} | null {
    if (this.route) {
      return this.route.args;
    }
    return null;
  }

  @observable
  protected modules = asMap({} as { [key: string]: IPageModule<{}, {}> });

  @observable
  protected fetcher = observable({
    path: null as string | null,
    data: asReference(null) as {} | null
  });

  @computed
  protected get route(): IRoute | null {
    for (const route of routes) {
      const args = match(this.path, route.pattern);
      if (args) {
        return {
          pattern: route.pattern,
          load: route.load,
          key: route.key,
          args
        };
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
    const route = this.route;
    if (route) {
      if (!this.required[route.key]) {
        this.required[route.key] = true;
        route.load(mod => {
          this.modules.set(route.key, {
            default: asReference(mod.default),
            fetchData: asReference(mod.fetchData)
          });
        });
      }
    }
  }

  protected fetch() {
    const path = this.path;
    if (this.route && this.modules.get(this.route.key) && path !== this.fetcher.path) {
      const fetchData = this.modules.get(this.route.key).fetchData;
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
        fetchData(this.route.args, data => {
          if (this.fetcher.path === path) {
            this.fetcher.data = data;
          }
        });
      }
    }
  }

}
