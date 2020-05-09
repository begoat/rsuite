/* eslint-disable */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const npmPackage = require('./package.json');

function checkIsProduction() {
  return process.env.NODE_ENV === 'production';
}
/* eslint-enable */

const targetDir = path.resolve(__dirname, 'dist');

module.exports = {
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    host: '0.0.0.0',
    port: npmPackage.config.port
  },
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js?[hash]',
    path: targetDir,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader?babelrc']
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'less-loader?javascriptEnabled=true'
        ]
      }
    ]
  },

  plugins: [
    new HtmlwebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    // https://github.com/webpack-contrib/copy-webpack-plugin/issues/455#issuecomment-624077112
    // checkIsProduction() &&
    new CopyPlugin([
      { from: 'main.js', to: targetDir },
      { from: 'preload.js', to: targetDir },
      { from: 'package.json', to: targetDir }
    ])
  ]
};
