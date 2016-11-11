const express = require('express');
const renderPage = require('./server/renderPage').renderPage;

const server = express();

const baseUrl = process.env.DEV_SERVER_URL || '/';

server.use('/build', express.static('build'));

server.use((req, res) => {
  renderPage(req.url).then(([html]) => {
    res.send(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
    ${baseUrl === '/' ? `<link rel="stylesheet" href="${baseUrl}build/main.css" />` : ''}
  </head>
  <body>
    <div id="app">
      ${html}
    </div>
    <script src="${baseUrl}build/main.js" async></script>
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