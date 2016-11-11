const express = require('express');

const server = express();
const baseUrl = process.env.DEV_SERVER_URL || '/build/';

server.use('/build', express.static('build'));

server.use((req, res) => {
  if(baseUrl !== '/build/') {
    delete require.cache[require.resolve('./server/renderPage')];
  }
  const renderPage = require('./server/renderPage').renderPage;
  renderPage(req.url).then(([html]) => {
    res.send(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
    ${baseUrl === '/build/' ? `<link rel="stylesheet" href="${baseUrl}main.css" />` : ''}
  </head>
  <body>
    <div id="app">${html}</div>
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