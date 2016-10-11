const path = require('path');
const fs = require('fs');
const tsfmt = require('typescript-formatter');

fs.readdir(path.resolve('src', 'reducers'), (err, files) => {
  const names = files
    .map(filename => path.basename(filename, path.extname(filename)))
    .filter(name => name !== 'index');

  const imports = names.map(name => `import ${name}_ from './${name}';`).join('\n');
  const newValues = names.map(name => `const ${name} = ${name}_(data.${name}, action);`).join('\n');
  const changed = names.map(name => `data.${name} !== ${name}`).join(' || '); 
  const result = `
  import { IAction } from '../actions';
  ${imports}

  export default (data: IData, action: IAction) => {
    ${newValues}
    if (${changed}) {
      return { ${names.join(', ')} };
    }
    return data;
  }
  `;

  const filename = path.resolve('src', 'reducers', 'index.ts')

  fs.writeFile(filename, result, () => {
    tsfmt.processFiles([filename], {
      dryRun: false,
      replace: true,
      verify: false,
      tsconfig: true,
      tslint: true,
      editorconfig: true,
      tsfmt: true
    });
  });
});
