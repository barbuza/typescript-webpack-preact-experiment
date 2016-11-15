import { Store } from '../stores';

export interface IDynamicPageModule<A, D> {
  component: React.ComponentClass<A & D>;
  key?: string;
  auth?: boolean;
  fetchData?: (data: A, store: Store) => Promise<D>;
}

export interface IStaticPageModule<D> {
  component: React.ComponentClass<D>;
  key?: string;
  auth?: boolean;
  fetchData?: (store: Store) => Promise<D>;
}

export class StaticRoute<D> {
  constructor(
    public pattern: string,
    public key: string,
    public load: () => Promise<IStaticPageModule<D>>,
    public auth?: boolean
  ) { }
}

export class DynamicRoute<A, D> {
  constructor(
    public pattern: string,
    public key: string,
    public load: () => Promise<IDynamicPageModule<A, D>>,
    public auth?: boolean
  ) { }
}

export function unwrapModule<A, B>(mod: { Page: A, fetchData: B }): { component: A, fetchData?: B } {
  return { component: mod.Page, fetchData: mod.fetchData };
}
