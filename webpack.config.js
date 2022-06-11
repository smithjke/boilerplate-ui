// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyWebpackPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const pathResolve = (dir) => path.resolve(__dirname, dir);

const {
  NODE_ENV = 'production',
  API_HOST,
} = process.env;

const isProd = NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: pathResolve('dist'),
    filename: isProd ? 'static/[name].[contenthash:8].js' : 'static/[name].js',
    publicPath: '/',
    clean: true,
  },
  optimization: {
    minimize: isProd,
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'babel-loader', options: { cacheDirectory: false } },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      pathResolve('src'),
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.txt', '.html'],
    alias: {
      '~': pathResolve('src'),
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve('public/static'),
          to: path.resolve('dist/static'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
    }),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/v1': {
        target: API_HOST,
        logLevel: 'debug',
        changeOrigin: true,
      },
    },
  },
};
