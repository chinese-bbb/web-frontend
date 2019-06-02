const path = require('path');
const fs = require('fs');

module.exports = {
  publicPath: '',
  lintOnSave: true,
  devServer: {
    port: 8080,
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: '/index.html' }],
    },
    https: {
      key: fs.readFileSync(path.join(__dirname, './certs/server.key')),
      cert: fs.readFileSync(path.join(__dirname, './certs/server.crt')),
    },
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
  pwa: {
    themeColor: '#1a535c',
    msTileColor: '#1a535c',
    workboxOptions: {
      clientsClaim: true,
      cleanupOutdatedCaches: true,
      importWorkboxFrom: 'disabled',
      importScripts: ['https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js'],
    },
  },
  transpileDependencies: ['vue-clamp', 'resize-detector'],
};
