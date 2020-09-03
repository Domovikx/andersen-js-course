const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // резолвим файлы
  },

  context: path.resolve(__dirname, 'src'), // root папка

  mode: 'development',

  // входной файл
  entry: {
    main: ['@babel/polyfill', './main.ts'],
  },

  output: {
    filename: `[name].[hash]`.js,
    path: path.resolve(__dirname, 'dist'),
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  plugins: [
    // это плагины для css
    new MiniCssExtractPlugin(),
    new TerserPlugin(),
    new OptimizeCssAssetsPlugin(),

    // это для HTML
    new HtmlWebpackPlugin({
      template: './index.html',
    }),

    // очистка dist
    new CleanWebpackPlugin(),

    // копирование статических файлов
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.png'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],

  // сервер и порт
  devServer: { port: 4200 },

  module: {
    rules: [
      // оставлю на случай использования чистых css в проекте
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          'css-loader',
        ],
      },

      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },

      // поддержка JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      // поддержка TS
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },

      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
