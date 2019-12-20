const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    [
      '/auth/github',
      '/auth/login/success',
      '/users',
      '/auth/login/success',
      '/auth/github/callback'
    ],
    proxy({
      target: 'http://localhost:4000',
      changeOrigin: true
    })
  );
};
