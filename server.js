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
  renderPage(baseUrl, req, res);
});

server.listen(3010, err => {
  if(err) {
    console.error(err);
  }

  console.log('Listen on 3010');
});