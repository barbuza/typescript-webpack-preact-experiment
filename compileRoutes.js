const path = require('path');
const mzFs = require('mz/fs');
const through = require('through2');
const yaml = require('js-yaml');
const typescript = require('typescript');
const _ = require('lodash');

class PageModule {

  constructor(filename, sourceFile, index, request) {
    this.index = index;
    this.request = request;

    const classes = this.findExportedNames(sourceFile, typescript.SyntaxKind.ClassDeclaration);
    this.className = classes[0];
    if (classes.length !== 1) {
      throw new Error(`${filename} contains ${classes.length} exported classes`);
    }

    const functions = this.findExportedNames(sourceFile, typescript.SyntaxKind.FunctionDeclaration);
    this.hasData = functions.indexOf('fetchData') !== -1;

    const interfaces = this.findExportedNames(sourceFile, typescript.SyntaxKind.InterfaceDeclaration);
    if (this.hasData) {
      if (interfaces.indexOf('IData') === -1) {
        throw new Error(`${filename} contains fetchData function but doesn't export IData interface`);
      }
    }
    this.hasArgs = interfaces.indexOf('IArgs') !== -1;
  }

  findExportedNames(sourceFile, nodeKind) {
    return sourceFile.statements
      .filter(node => node.kind === nodeKind)
      .filter(node => typescript.getNodeModifiers(node) === 'export')
      .map(node => node.name.text);
  }

}

function getPageModule(request, index, page) {
  return mzFs.access(request)
    .then(() => path.resolve(request, 'index.tsx'))
    .catch(() => `${request}.tsx`)
    .then(filename =>
      mzFs.readFile(filename, 'utf-8')
        .then(content => typescript.createSourceFile(filename, content, typescript.ScriptTarget.ES6))
        .then(sourceFile => new PageModule(filename, sourceFile, index, page))
    );
}


function resolveRequest(origin, request) {
  let result = path.relative(path.dirname(origin), request);
  if (result[0] !== '.') {
    result = `./${result}`;
  }
  return result;
}

function isStaticPattern(pattern) {
  return pattern.indexOf(':') === -1;
}

function getArgsType(pattern) {
  const regex = /:\w+/g;
  let args = [];
  let match;
  while (match = regex.exec(pattern)) {
    args.push(match[0].substr(1));
  }
  return `{ ${args.map(name => `${name}: string`).join(', ')} }`;
}

module.exports = function (resultFilename, server = false) {
  return through.obj(function (file, encoding, done) {
    if (!file.isBuffer()) {
      this.emit('error');
    }

    const config = yaml.safeLoad(file.contents);
    const pages = _.uniq(_.map(config, 'page'));
    const pageModules = {};

    const lines = [];
    const write = lines.push.bind(lines);

    Promise.all(pages.map((page, index) => {
      const request = path.resolve(path.dirname(file.path), page);
      return getPageModule(request, index, page).then(mod => pageModules[page] = mod);
    })).then(() => {
      const modules = _.sortBy(_.values(pageModules), 'index');
      const imports = [
        `import { typeCheck } from ${JSON.stringify(resolveRequest(file.path, 'src/utils'))};`,
        `import { StaticRoute, DynamicRoute, IStaticPageModule, IDynamicPageModule } from ${JSON.stringify(resolveRequest(file.path, 'src/support/routing'))};`
      ];
      const declarations = [
        'declare namespace require {\n  function ensure(deps: string[], callback: () => void): void;\n}'
      ];

      modules.forEach(mod => {
        const moduleImports = [`${mod.className} as Page${mod.index}`];
        if (mod.hasData) {
          moduleImports.push(
            `fetchData as fetchData${mod.index}`,
            `IData as IData${mod.index}`
          );
        }
        if (mod.hasArgs) {
          moduleImports.push(`IArgs as IArgs${mod.index}`);
        }
        imports.push(`import { ${moduleImports.join(', ')} } from ${JSON.stringify(mod.request)};`);

        if (mod.hasData) {
          declarations.push(`declare function require(path: ${JSON.stringify(mod.request)}): { ${mod.className}: typeof Page${mod.index}, fetchData: typeof fetchData${mod.index} };`);
        } else {
          declarations.push(`declare function require(path: ${JSON.stringify(mod.request)}): { ${mod.className}: typeof Page${mod.index} };`);
        }
      });

      write('/* tslint:disable */');
      write(imports.join('\n'));
      write('\n');
      write(declarations.join('\n'));
      write('\n');

      modules.forEach(mod => {
        const dataType = mod.hasData ? `IData${mod.index}` : `{}`;
        const moduleType = !mod.hasArgs ? `IStaticPageModule<${dataType}>` : `IDynamicPageModule<IArgs${mod.index}, ${dataType}>`;
        write(`function getPage${mod.index}(): Promise<${moduleType}> {`);
        write('  return new Promise(resolve => {');
        
        if(!server) {
          write(`    require.ensure([${JSON.stringify(mod.request)}], () => {`);
        }
        
        write(`      const mod = require(${JSON.stringify(mod.request)});`);
        if (mod.hasData) {
          write(`      resolve({ component: mod.${mod.className}, fetchData: mod.fetchData });`);
        } else {
          write(`      resolve({ component: mod.${mod.className} });`);
        }
        if(!server) {
          write(`    });`);
        }
        write(`});\n`);
        write(`}\n`);
      });

      write('export const routes: Array<StaticRoute<{}> | DynamicRoute<{}, {}>> = [];');

      const grouppedItems = _.groupBy(config, 'path');
      Object.keys(grouppedItems).map(i => grouppedItems[i]).forEach(group => {
        if(group.length === 1) {
          const item = group[0];
          const mod = pageModules[item.page];
          const isStatic = isStaticPattern(item.path);
          if (!isStatic) {
            if (!mod.hasArgs) {
              throw new Error(`can't connect ${item.path} to ${item.page}: IArgs isn't exported`);
            }
            write(`typeCheck<IArgs${mod.index}>({} as ${getArgsType(item.path)});`);
          }
          const dataType = mod.hasData ? `IData${mod.index}` : `{}`;
          const routeClass = isStatic ? `StaticRoute<${dataType}>` : `DynamicRoute<IArgs${mod.index}, ${dataType}>`;
          write(`routes.push(new ${routeClass}(${JSON.stringify(item.path)}, ${JSON.stringify(mod.index.toString())}, getPage${mod.index}));\n`);
        } else if(group.length === 2) {
          const authItem = group[0].auth ? group[0] : group[1];
          const defItem = group[1].auth ? group[0] : group[1];

          const authMod = pageModules[authItem.page];
          const defMod = pageModules[defItem.page];

          const isStatic = true;
          // const isStatic = isStaticPattern(authItem.path);
          if (!isStatic) {
            if (!mod.hasArgs) {
              throw new Error(`can't connect ${item.path} to ${item.page}: IArgs isn't exported`);
            }
            write(`typeCheck<IArgs${mod.index}>({} as ${getArgsType(item.path)});`);
          }

          const dataType = defMod.hasData ? `IData${mod.index}` : `{}`;
          const routeClass = isStatic ? `StaticRoute<${dataType}>` : `DynamicRoute<IArgs${mod.index}, ${dataType}>`;
          const func = `(auth: boolean) => auth ? getPage${authMod.index}() : getPage${defMod.index}()`;
          write(`routes.push(new ${routeClass}(${JSON.stringify(defItem.path)}, ${JSON.stringify(defMod.index.toString())}, ${func}));\n`);
        } else {
          console.error('Error: more than 2 routes for one path');
          this.emit('error');
        }
      });

      file.path = resultFilename; //file.path.replace(/\.yml/, '.ts');
      file.contents = new Buffer(lines.join('\n'));
      done(null, file);
    });
  });
};
