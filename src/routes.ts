declare function require(path: string): any;

declare namespace require {
  function ensure(deps: string[], callback: () => void): void;
}

export default [

  {
    pattern: "/",
    key: "0",
    load: (resolve: (mod: IPageModule<{}, {}>) => void) => {
      require.ensure(["./pages/Index"], () => {
        resolve(require("./pages/Index"));
      });
    }
  },

  {
    pattern: "/foo",
    key: "1",
    load: (resolve: (mod: IPageModule<{}, {}>) => void) => {
      require.ensure(["./pages/Foo"], () => {
        resolve(require("./pages/Foo"));
      });
    }
  },

  {
    pattern: "/bar/:id",
    key: "2",
    load: (resolve: (mod: IPageModule<{}, {}>) => void) => {
      require.ensure(["./pages/Bar"], () => {
        resolve(require("./pages/Bar"));
      });
    }
  },

  {
    pattern: "/spam/:id",
    key: "2",
    load: (resolve: (mod: IPageModule<{}, {}>) => void) => {
      require.ensure(["./pages/Bar"], () => {
        resolve(require("./pages/Bar"));
      });
    }
  },

] as Array<IPageConfig>;
