/**
 * This file is needed for development only, in order to also proxy all non-fetch/non-axios (non-XHR) requests to the express server's localhost url.
 * This is because in development the react app is running on a different port than the express server.
 * You do not need to import this file anywhere. It is automatically registered when you start the development server.
 */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/callback"],
    createProxyMiddleware({
      // see https://github.com/chimurai/http-proxy-middleware for more options
      target: "http://localhost:3000",
      secure: false,
      // changeOrigin: true,
      followRedirects: false,
      hostRewrite: true,
      autoRewrite: true,
      cookieDomainRewrite: "localhost",

      //   protocolRewrite: "http",
    })
  );
};
