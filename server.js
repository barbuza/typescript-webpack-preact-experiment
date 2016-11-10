const renderPage = require('./server/renderPage').renderPage;

renderPage('/').then(html => {
  console.log(html);
})