module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  const routes = JSON.parse(source).map(route => `
    preact.h(RouteLoader, {
      path: ${JSON.stringify(route[0])},
      getClass: function(resolve) {
        require.ensure(${JSON.stringify(route[1])}, function() {
          resolve(require(${JSON.stringify(route[1])}).default);
        });
      }
    })
  `);
  return `
    var preact = require("preact");
    var Router = require("preact-router").Router;
    var RouteLoader = require("./lib/RouteLoader").default;
    module.exports = function Routes() {
      return preact.h(Router, {}, ${routes.join(',\n')});
    };
  `;
};
