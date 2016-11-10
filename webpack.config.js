const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const selectorName = process.env.NODE_ENV === 'production' ? '[hash:base64:8]' : '[name]_[local]_[hash:base64:4]';

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    './src/index'
  ],
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
        test: /\.tsx?$/,
        use: [
          'react-hot-loader/webpack',
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
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
  ]
};
if (process.env.NODE_ENV === 'production') {
  module.exports.module.rules.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: [
        {
          loader: 'css-loader',
          query: {
            minimize: true,
            importLoaders: 1,
            module: true,
            localIdentName: selectorName
          }
        },
        'postcss-loader',
        'sass-loader'
      ]
    })
  });

  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: /a^/,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  );
} else {
  module.exports.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
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
    ],
  });
  module.exports.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}
