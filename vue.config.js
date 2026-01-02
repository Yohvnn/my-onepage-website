const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  devServer: {
    historyApiFallback: true,
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  configureWebpack: {
    target: ['web', 'es2017'],
    plugins: [
      new ModuleFederationPlugin({
        name: 'main_app',
        remotes: {
          tool_pdf: 'tool_pdf@http://localhost:8081/remoteEntry.js',
          tool_tictactoe: 'tool_tictactoe@http://localhost:8082/remoteEntry.js',
          tool_flipcoin: 'tool_flipcoin@http://localhost:8083/remoteEntry.js'
        },
        shared: {
          vue: {
            singleton: true,
            requiredVersion: '^3.2.13',
            eager: true
          }
        }
      })
    ]
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0] = {
        ...args[0],
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
      }
      return args
    })
  }
})
