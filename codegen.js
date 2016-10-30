const ejs = require('ejs');
const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('lodash');

const routeKeys = {};

const routes = yaml.safeLoad(fs.readFileSync('./src/routes.yml', 'utf-8')).map(route => {
  if (!routeKeys[route.page]) {
    routeKeys[route.page] = Object.keys(routeKeys).length.toString();
  }
  const regex = /:\w+/g;
  let args = [];
  let match;
  while (match = regex.exec(route.path)) {
    args.push(match[0].substr(1));
  }
  const static = !args.length;
  args = `{ ${args.map(name => `${name}: string`).join(', ')} }`;
  const key = routeKeys[route.page];
  return {
    static,
    args,
    type: static ? `StaticRoute<Data${key}>` : `DynamicRoute<Args${key}, Data${key}>`,
    modType: static ? `IStaticPageModule<Data${key}>` : `IDynamicPageModule<Args${key}, Data${key}>`,
    key: routeKeys[route.page],
    path: `'${route.path}'`,
    page: `'${route.page}'`
  };
});

fs.writeFileSync('./src/routes.ts', ejs.render(
  fs.readFileSync('./src/routes.ts.ejs', 'utf-8'),
  { routes, keys: Object.keys(routeKeys), routeKeys }
));
