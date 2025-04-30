const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack'); // Add this line
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/', // Ensure correct routing for React Router
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
          patterns: [
//            { from: 'public/_redirects', to: '_redirects' },
            {from: 'netlify.toml',to:''},
          ],
        }),
    new Dotenv({
      path: './.env', // Path to your .env file
      safe: true, // Ensures all variables are defined
      systemvars: true, // Also load system environment variables
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3030,
    historyApiFallback: true, // Supports React Router
    open: true, // Opens browser automatically
  },
  mode: 'development', // Explicitly set mode (optional, since you use --mode)
};