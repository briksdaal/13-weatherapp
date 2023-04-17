const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Weather App',
      template: '!!handlebars-loader!./src/index.hbs',
    }),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    static: './dist',
    watchFiles: ['src/**/*.js', 'src/**/*.css', 'src/**/*.hbs'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|webp|svg|jpg|jpeg|gif|avif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
