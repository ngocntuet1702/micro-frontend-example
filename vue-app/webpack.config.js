const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageJson = require('./package.json');
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
  entry: "./src/index",
  module: {
    rules: [
        {
            test: /\.vue$/,
            use: 'vue-loader'
        },
        {
          test: /\.css$/i,
          use: ["css-loader"],
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime'],
                }
            }
        }
    ]
  },
  output: {
    publicPath: 'http://localhost:8082/'
  },
  mode: "development",
  devServer: {
    port: 8082,
    historyApiFallback: {
        index: '/index.html'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'VueApp',
      filename: 'vueEntry.js',
      exposes: {
          './App': './src/bootstrap'
      },
      shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.vue']
  },
}
