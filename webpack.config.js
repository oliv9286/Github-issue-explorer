const webpack = require('webpack');
const path = require('path');

const devPort = 3000;

const config = {
  entry: {
    bundle: [path.resolve(__dirname, 'src', 'index.tsx')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loaders: ['ts-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        include: [path.resolve(__dirname, 'src')],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  devtool: 'source-map',
  target: 'web',
  stats: 'verbose',

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.DefinePlugin({
      'process.env.VERSION': "'v" + require('./package.json').version + "'",
    }),
  ],

  devServer: {
    port: devPort,
    hot: true,
    hotOnly: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
};

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'eval';
  config.output.publicPath = config.devServer.publicPath = `https://localhost:${devPort}/`;

  config.entry.bundle = ['react-hot-loader/patch'].concat(config.entry.bundle);

  config.module.rules[0].loaders = ['react-hot-loader/webpack'].concat(config.module.rules[0].loaders);

  config.plugins = config.plugins.concat([
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]);
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: true,
    }),
  ]);
}

module.exports = config;
