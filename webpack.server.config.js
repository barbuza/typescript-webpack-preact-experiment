const path = require('path');
const webpack = require('webpack');

const selectorName = process.env.NODE_ENV === 'production' ? '[hash:base64:8]' : '[name]_[local]_[hash:base64:4]';

module.exports = ({ watch } = {}) => {
  const config = {
    entry: './src/server',
    output: {
      filename: 'renderPage.js',
      path: path.resolve('server'),
      libraryTarget: 'commonjs2',
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx']
    },
    watch: watch,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
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
          test: /\.scss$/,
          use: [
            'isomorphic-style-loader',
            {
              loader: 'css-loader',
              query: {
                importLoaders: 1,
                module: true,
                localIdentName: selectorName
              }
            },
            'postcss-loader?parser=postcss-scss'
          ],
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
      new webpack.EnvironmentPlugin([
        'NODE_ENV'
      ]),
    ]
  };

  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        comments: /a^/,
        compress: {
          warnings: false
        }
      })
    );
  }
  
  return config;
};
