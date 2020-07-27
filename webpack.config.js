const path = require('path');

const outFilePath = path.resolve(__dirname, 'public');

module.exports = {
  entry: ['regenerator-runtime', path.resolve(__dirname, './src/index.js')],
  output: {
    path: outFilePath,
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s*)css$/,
        use: [
          'style-loader',
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      // As we're using Web Worker, we need to specify the worker-loader as below:
      {
        test: /\.worker/,
        include: /datamodel/,
        loader: 'worker-loader',
        options: {
          inline: false, // If you want to make it inline, set to true.
          fallback: true
        },
      },
    ],
  },
  devServer: {
    inline: true,
    contentBase: outFilePath,
  },
};
