/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:3000",
            changeOrigin: true,
        }),
    );
};
