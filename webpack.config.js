var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: './src/index',
  output: {
    filename: '[name].js',
    path: path.resolve('build'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx']
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['webpack-append?var preact = require("preact")', 'baggage?[file].css=styles' , 'ts']
    }, {
      test: /\.gif$/,
      loaders: ['file']
    }, {
      test: /\.css$/,
      loaders: ['style', 'css?module&importLoaders=1&localIdentName=[name]_[local]_[hash:hex:5]']
    }]
  },
  devtool: process.env.NODE_ENV === 'production' ? '#sourcemap' : '#eval-sourcemap',
  plugins: [
    new HtmlPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'React.createElement': 'preact.h'
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: /a^/,
      compress: {
        warnings: false
      }
    })
  );
} else {
  module.exports.plugins.push(
    new DashboardPlugin()
  );
}
