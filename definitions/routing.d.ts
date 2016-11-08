declare interface IDynamicPageModule<A, D> {
  component: React.ComponentClass<A & D>;
  fetchData?: (data: A, resolve: (data: D) => void) => void;
}

declare interface IStaticPageModule<D> {
  component: React.ComponentClass<D>;
  fetchData?: (resolve: (data: D) => void) => void;
}
