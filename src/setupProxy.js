const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  let url;
  if(process.env.NODE_ENV === "development") {
    url = "http://localhost:9000";
  } else {
    url = window.location.origin;
  }
  app.use(createProxyMiddleware("/api/**", {
      target: url
  }));
};