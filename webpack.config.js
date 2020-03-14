const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash'); // добавили плагин
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки
module.exports = {
  entry: {
    main: './src/index.js',
    secondary: './src/pages/secondary/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].[chunkhash].js',

  },
// указали путь к файлу, в квадратных скобках куда вставлять сгенерированный хеш
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./roboto/[name].[ext]'
        },
      {
        test: /\.css$/i,
        use: [
          (isDev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../',
                }
            }),
          'css-loader',
          'postcss-loader',


      ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

       {
        test: /\.(svg|jpg|gif|ico|png)$/,
        use: [
             'file-loader?name=./images/[name].[ext]',
             {
              loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                    quality: 85,
                },
                optipng: {
                    enabled: false,
                },
                svgo: {
                  enabled: true,
                },
                pngquant: {
                  quality: [0.85, 0.9],
                  speed: 4,
                },
                gifsicle: {
                    interlaced: false,
                },
                webp: {
                    quality: 85,
                },
              },
            },
        ],
        }

    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
 }),

 new HtmlWebpackPlugin({
  inject: false,
  hash: true,
  template: './src/index.html',
  filename: './index.html',
}),
new HtmlWebpackPlugin({
  inject: false,
  hash: true,
  template: './src/pages/secondary/index.html',
  filename: 'secondary/index.html',
}),
    new MiniCssExtractPlugin({
     filename: '[name]/[name].[contenthash].css'


  }),
  new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
 }),
    new WebpackMd5Hash()
  ]
};