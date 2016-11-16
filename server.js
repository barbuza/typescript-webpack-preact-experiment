const express = require('express');
const cookieParser = require('cookie-parser');

const server = express();
const baseUrl = process.env.DEV_SERVER_URL || '/build/';

server.use('/build', express.static('build'));

server.use(cookieParser());

server.use((req, res) => {
  if(baseUrl !== '/build/') {
    delete require.cache[require.resolve('./server/renderPage')];
  }
  const renderPage = require('./server/renderPage').renderPage;
  renderPage(req.url, req.cookies).then(({ html, store, is404 }) => {
    res.status(is404 ? 404 : 200);
    res.send(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
    ${baseUrl === '/build/' ? `<link rel="stylesheet" href="${baseUrl}main.css" />` : ''}
  </head>
  <body>
    <div id="app">${html}</div>
    <script>window._store = ${JSON.stringify(store)};</script>
    <script src="${baseUrl}main.js" async></script>
  </body>
</html>`);
  });
});

server.listen(3010, err => {
  if(err) {
    console.error(err);
  }

  console.log('Listen on 3010');
});