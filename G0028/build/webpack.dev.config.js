"use strict";

let path = require("path");
let webpack = require("webpack");

const apiMocker = require('webpack-api-mocker');

let merge = require("webpack-merge");
let baseWpConfig = require("./webpack.base.config");
let buildEnv = require('./BuildEnv.config');

//baseWpConfig.entry.app.unshift("webpack-hot-middleware/client");
//baseWpConfig.entry.frontend.unshift("webpack-hot-middleware/client");

let configs = [];
baseWpConfig.map(c => {
  configs.push(merge(c, {
    mode: "development",

    devtool: "#inline-source-map",

    devServer: {
      //hot: false,
      //inline: false,
      host: '0.0.0.0',
      contentBase: path.join(__dirname, '../dist'),
      proxy: {
        '/development/games/G0028/data': {
          target: 'http://localhost:60028',
          pathRewrite: {'^/development/games/G0028/data' : 'data'}
        },
        '/development/games/G0028/services': {
          target: 'http://localhost:60028',
          pathRewrite: {'^/development/games/G0028/services' : 'services'}
        }
      },
      before(app) {
        apiMocker(app, path.resolve('mock/index.js')
          /*, {
                 proxy: {
                   '/repos/*': 'https://api.github.com/',
                 },
                 changeHost: true,
               }*/
        );
      }
    },

    module: {},

    performance: {
      hints: false
    },

    plugins: []
  }));
})

module.exports = configs;
