declare interface IDynamicPageModule<A, D> {
  component: preact.ComponentConstructor<A & D, {}>;
  fetchData?: (data: A, resolve: (data: D) => void) => void;
}

declare interface IStaticPageModule<D> {
  component: preact.ComponentConstructor<D, {}>;
  fetchData?: (resolve: (data: D) => void) => void;
}
