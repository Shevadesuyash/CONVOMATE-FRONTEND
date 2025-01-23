const path = require('path');

module.exports = {
  entry: './src/index.js',  // Your entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // This will target both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],  // This tells Babel to transpile modern JS and React JSX
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Allow importing without specifying file extensions
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3030,
    historyApiFallback: true,
  },
};
