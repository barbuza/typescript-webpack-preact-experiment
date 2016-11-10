const renderPage = require('./server/renderPage').renderPage;

renderPage('/bar/123').then(html => {
  console.log(html);
})