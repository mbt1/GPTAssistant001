const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dotenv = require('dotenv').config({path: __dirname + '/.env'});

module.exports = {
  // stats: 'verbose',

  entry: './src/index.tsx',
  output: {
    // filename: '[name].bundle.js',
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.js', '.scss'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '' } // Copies all files from 'public' to 'dist'
      ],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'REACT_APP_TARGET_API_BASE_URL': JSON.stringify(process.env.REACT_APP_TARGET_API_BASE_URL),
      },
    }),
  ],
  module: {
    rules: [
      // TypeScript Rule
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // SCSS Rule
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader',   // Translates CSS into CommonJS
          'sass-loader'   // Compiles Sass to CSS
        ],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env', '@babel/preset-react'],
      //     },
      //   },
      // },
    ],
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 5000,
  },
};
