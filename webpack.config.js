const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const selectorName = process.env.NODE_ENV === 'production' ? '[hash:base64:8]' : '[name]_[local]_[hash:base64:4]';

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
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                importLoaders: 1,
                module: true,
                localIdentName: selectorName
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'webpack-append',
            query: 'var __preactCreateElement = require("preact").h'
          },
          {
            loader: 'baggage-loader',
            options: {
              '[file].scss': 'styles'
            }
          },
          'ts-loader'
        ]
      },
      {
        test: /\.(gif|jpg|png)$/,
        use: [
          'file'
        ]
      }
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? '#sourcemap' : '#eval-sourcemap',
  plugins: [
    new HtmlPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'React.createElement': '__preactCreateElement'
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    })
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
}
