declare interface IPageModule<A, D> {
  default: preact.ComponentConstructor<A & D, {}>;
  fetchData: undefined | ((data: A, resolve: (data: D) => void) => void);
}

declare interface IPageConfig<A, D> {
  pattern: string;
  key: string;
  load: (resolve: (mod: IPageModule<A, D>) => void) => void;
}
