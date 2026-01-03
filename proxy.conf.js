const PROXY_CONFIG = {
  "/api": {
    "target": "http://localhost:5173",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    },
    "logLevel": "debug",
    "onProxyReq": function(proxyReq, req, res) {
      console.log('Proxying request:', req.method, req.url);
    }
  }
};

module.exports = PROXY_CONFIG;
