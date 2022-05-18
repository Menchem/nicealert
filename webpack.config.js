//require("@babel/polyfill");
const webpack = require('webpack');
const mode = require('yargs').argv.mode;
const libraryTarget = require('yargs').argv['output-library-target'];
const pkg = require('./package.json');
const libraryName = pkg.name;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const banner = `
${libraryName}
${pkg.description}\n
@version v${pkg.version}
@homepage ${pkg.homepage}
@repository ${pkg.repository.url}\n
(c) 2022 zmc
Released under the MIT License.
hash: [hash]
`;

const plugins = [new webpack.BannerPlugin(banner)];

module.exports = {
  //entry:["@babel/polyfill", `${__dirname}/index.js`] ,
  entry:['object-defineproperty-ie8',`${__dirname}/index.js`],
  devtool: 'source-map',
  output: {
    path: `${__dirname}/${libraryTarget === 'umd' ? 'dist' : 'lib'}`,
    filename: mode === 'development' ? `${libraryName}.js` : `${libraryName}.min.js`,
    library: 'MicroSchemaValidator',
    libraryTarget: libraryTarget || 'umd',
    globalObject: "(typeof self !== 'undefined' ? self : this)", // https://github.com/webpack/webpack/issues/6522
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        exclude: /node_modules/,
        uglifyOptions: {
          ie8: true // 解决ie下的关键字default的问题
        }
      })
    ]
  },
  plugins: plugins
};
