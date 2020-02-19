/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'markdown-parser.js',
    publicPath: '/dist',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = (env, { mode = 'development' }) => {
  if (mode === 'production') {
    return commonConfig;
  }

  return merge(commonConfig, {
    mode,
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html'
      })
    ],
    devServer: {
      inline: true,
      host: '0.0.0.0',
      port: 8000,
      disableHostCheck: true
    }
  });
};
