const fs = require('fs');
const through = require('through2');
const ejs = require('ejs');
const yaml = require('js-yaml');

const template = fs.readFileSync('src/routes.ts.ejs', 'utf-8');

module.exports = function () {
  return through.obj(function (file, encoding, done) {
    if (!file.isBuffer()) {
      this.emit('error');
    }

    const routeKeys = {};
    const routes = yaml.safeLoad(file.contents).map(route => {
      if (!routeKeys[route.page]) {
        routeKeys[route.page] = Object.keys(routeKeys).length.toString();
      }
      const regex = /:\w+/g;
      let args = [];
      let match;
      while (match = regex.exec(route.path)) {
        args.push(match[0].substr(1));
      }
      const isStatic = !args.length;
      args = `{ ${args.map(name => `${name}: string`).join(', ')} }`;
      const key = routeKeys[route.page];
      return {
        isStatic,
        args,
        type: isStatic ? `StaticRoute<IData${key}>` : `DynamicRoute<IArgs${key}, IData${key}>`,
        modType: isStatic ? `IStaticPageModule<IData${key}>` : `IDynamicPageModule<IArgs${key}, IData${key}>`,
        key: routeKeys[route.page],
        path: `'${route.path}'`,
        page: `'${route.page}'`
      };
    });

    file.path = file.path.replace(/\.yml/, '.ts');
    file.contents = new Buffer(ejs.render(template, {
      routes, keys: Object.keys(routeKeys), routeKeys
    }));
  
    done(null, file);
  });
};
