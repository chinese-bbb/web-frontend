module.exports = {
  baseUrl: "",
  lintOnSave: true,
  devServer: {
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: "/index.html" }]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.common.js"
      }
    },
    optimization: {
      splitChunks: {
        minSize: 1024,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 5,
        name: true,
        chunks: "all",
        cacheGroups: {
          default: false,
          elementUI: {
            test(module) {
              let path = module.resource;
              if (!path) return false;
              path = path.replace(/\\/g, "/");
              return path && /node_modules\/element-ui/.test(path);
            },
            name: "chunk-element-ui",
            priority: 11,
            enforce: true
          },
          common: {
            name: "chunk-common",
            minChunks: 2,
            minSize: 30000
          }
        }
      }
    }
  },
  pwa: {
    workboxOptions: {
      importWorkboxFrom: "disabled",
      importScripts: ["https://g.alicdn.com/kg/workbox/3.6.3/workbox-sw.js"]
    }
  }
};
