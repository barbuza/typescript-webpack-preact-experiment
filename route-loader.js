var path = require("path");
var yaml = require("js-yaml");
var fs = require("fs");

module.exports = function(source) {
    if (this.cacheable) {
        this.cacheable();
    }
    const dirname = path.dirname(this.resourcePath);
    const loaderPath = `./${path.relative(dirname, path.resolve('src', 'components', 'PagePreloader'))}`;
    let hasDynamic = false;

    const routes = yaml.safeLoad(source).map(config => {
        const path = JSON.stringify(config.path);
        const page = JSON.stringify(config.page);

        const load = `
          if (!pages.has(${path})) {
            if (!loading[${path}]) {
              loading[${path}] = true;
              require.ensure(${page}, function() {
                if (process.env.NODE_ENV === 'production') {
                  pages.set(${path}, require(${page}).default);
                } else {
                  setTimeout(function() {
                    pages.set(${path}, require(${page}).default);
                  }, 500);
                }
              });
            }
            return h(PagePreloader);
          }
        `;

        if (config.path.indexOf(':') === -1) {
            return `
              if (path === ${path}) {
                ${load}
                return h(pages.get(${path}));
              }
            `;
        }
        let vars = '';
        if (!hasDynamic) {
            vars = 'var match = null;';
            hasDynamic = true;
        }
        return `
            ${vars}
            match = matchPattern(path, ${path});
            if (match) {
              ${load}
              return h(pages.get(${path}), match);
            }
        `;
    });

    return `
        import { h } from 'preact';
        import { connect } from 'mobx-preact';
        import { observable, asMap } from 'mobx';
        import preactClasslessComponent from 'preact-classless-component';
        import PagePreloader from ${JSON.stringify(loaderPath)};

        var pages = observable(asMap());
        var loading = {};

        function matchPattern(path, pattern) {
          var pathChunks = path.split('/');
          var patternChunks = pattern.split('/');
          var match = {};

          if (pathChunks.length !== patternChunks.length) {
            return false;
          }
          
          for (var i = 0; i < patternChunks.length; i++) {
            if (patternChunks[i][0] === ':') {
              match[patternChunks[i].substr(1)] = pathChunks[i];
            } else if (patternChunks[i] !== pathChunks[i]) {
              return false;
            }
          }

          return match;
        }

        export default connect(preactClasslessComponent({
          render: function() {
            var path = this.context.mobxStores.store.routing.path;
            ${routes.join("\n")}
            return h('div', null, 'not found');
          }
        }));
    `;
};
