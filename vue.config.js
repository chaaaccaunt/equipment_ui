const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
const path = require("path")

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: ['ui.equipment.local']
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@widgets': path.resolve(__dirname, 'src/widgets'),
        '@features': path.resolve(__dirname, 'src/features'),
      },
    },
  },
})
