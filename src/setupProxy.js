const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/users",
    createProxyMiddleware({
      target: "http://192.168.10.122:3001",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/erapad",
    createProxyMiddleware({
      target: "http://192.168.10.122:3004",
      changeOrigin: true,
    })
  );
};
