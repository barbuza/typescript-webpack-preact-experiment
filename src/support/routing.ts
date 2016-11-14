import { Store } from '../stores';

export interface IDynamicPageModule<A, D> {
  component: React.ComponentClass<A & D>;
  fetchData?: (data: A, store: Store) => Promise<D>;
}

export interface IStaticPageModule<D> {
  component: React.ComponentClass<D>;
  fetchData?: (store: Store) => Promise<D>;
}

export class StaticRoute<D> {
  constructor(
    public pattern: string,
    public key: string,
    public load: (auth?: boolean) => Promise<IStaticPageModule<D>>
  ) { }
}

export class DynamicRoute<A, D> {
  constructor(
    public pattern: string,
    public key: string,
    public load: (auth?: boolean) => Promise<IDynamicPageModule<A, D>>
  ) { }
}

export function unwrapModule<A, B>(mod: { Page: A, fetchData: B }): { component: A, fetchData?: B } {
  return { component: mod.Page, fetchData: mod.fetchData };
}
