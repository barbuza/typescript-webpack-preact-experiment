const ejs = require('ejs');
const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('lodash');

const routes = yaml.safeLoad(fs.readFileSync('./src/routes.yml', 'utf-8')).map(route => ({
    path: JSON.stringify(route.path),
    page: JSON.stringify(route.page)
}));

fs.writeFileSync('./src/components/Routes.tsx', ejs.render(
    fs.readFileSync('./src/components/Routes.ejs', 'utf-8'),
    { routes }
));
