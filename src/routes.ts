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
        if (process.env.NODE_ENV === 'production') {
          resolve(require("./pages/Index"));
        } else {
          setTimeout(() => {
            resolve(require("./pages/Index"));
          }, 500);
        }
      });
    }
  },

  {
    pattern: "/foo",
    key: "1",
    load: (resolve: (mod: IPageModule<{}, {}>) => void) => {
      require.ensure(["./pages/Foo"], () => {
        if (process.env.NODE_ENV === 'production') {
          resolve(require("./pages/Foo"));
        } else {
          setTimeout(() => {
            resolve(require("./pages/Foo"));
          }, 500);
        }
      });
    }
  },

  {
    pattern: "/bar/:id",
    key: "2",
    load: (resolve: (mod: IPageModule<{}, {}>) => void) => {
      require.ensure(["./pages/Bar"], () => {
        if (process.env.NODE_ENV === 'production') {
          resolve(require("./pages/Bar"));
        } else {
          setTimeout(() => {
            resolve(require("./pages/Bar"));
          }, 500);
        }
      });
    }
  },

  {
    pattern: "/spam/:id",
    key: "2",
    load: (resolve: (mod: IPageModule<{}, {}>) => void) => {
      require.ensure(["./pages/Bar"], () => {
        if (process.env.NODE_ENV === 'production') {
          resolve(require("./pages/Bar"));
        } else {
          setTimeout(() => {
            resolve(require("./pages/Bar"));
          }, 500);
        }
      });
    }
  },

] as Array<IPageConfig>;
