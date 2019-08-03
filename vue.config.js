const path = require('path');
const fs = require('fs');

module.exports = {
  publicPath: '',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    port: 8080,
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: '/index.html' }],
    },
    https: process.env.NODE_ENV === 'development' ? {
      key: fs.readFileSync(path.join(__dirname, './certs/server.key')),
      cert: fs.readFileSync(path.join(__dirname, './certs/server.crt')),
    } : undefined,
    sockHost: 'localhost',
    sockPort: '8080',
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.common.js',
      },
    },
    optimization: {
      splitChunks: {
        minSize: 1024,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 5,
        name: true,
        chunks: 'all',
        cacheGroups: {
          default: false,
          elementUI: {
            test(module) {
              let path = module.resource;
              if (!path) return false;
              path = path.replace(/\\/g, '/');
              return path && /node_modules\/element-ui/.test(path);
            },
            name: 'chunk-element-ui',
            priority: 11,
            enforce: true,
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            minSize: 30000,
          },
        },
      },
    },
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch');
  },
  transpileDependencies: ['vue-clamp', 'resize-detector'],
};
