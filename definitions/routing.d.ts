declare interface IPageModule<P, D> {
  default: preact.ComponentConstructor<P & D, {}>;
  fetchData: undefined | ((data: P, resolve: (data: D) => void) => void);
}

declare interface IPageConfig {
  pattern: string;
  key: string;
  load: (resolve: (mod: IPageModule<{}, {}>) => void) => void;
}
