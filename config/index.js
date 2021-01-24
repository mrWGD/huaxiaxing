// see http://vuejs-templates.github.io/webpack for documentation.
var path = require("path");

module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"',
    },
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "./",
    productionSourceMap: true,
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ["js", "css"],
  },
  dev: {
    env: {
      NODE_ENV: '"development"',
    },
    port: 8000,
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    context: [
      //代理路径
      "/shopping",
      "/ugc",
      "/v1",
      "/v2",
      "/v3",
      "/v4",
      "/bos",
      "/member",
      "/promotion",
      "/eus",
      "/payapi",
      "/img",
    ],
    proxypath: "http://cangdu.org:8001",
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
//   devServer: {
//     // host:'接口的访问域名（后台提供给前端）',
//     proxy: {
//       "/api": {
//         target: "接口访问的域名（后台提供给前端，同以上）", // 设置你调用的接口域名
//         changeOrigin: true, // 是否跨域
//         ws: true,
//         pathRewrite: {
//           "^/api": "/", // 这里可以理解为用‘/api’来代替target里面的地址
//         },
//       },
//     },
//   },
};
