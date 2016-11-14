declare interface IDynamicPageModule<A, D> {
  component: React.ComponentClass<A & D>;
  fetchData?: (data: A) => Promise<D>;
}

declare interface IStaticPageModule<D> {
  component: React.ComponentClass<D>;
  fetchData?: () => Promise<D>;
}
