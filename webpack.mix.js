const mix = require('laravel-mix');
const path = require('path');

mix.js('resources/js/index.jsx', 'public/js')
.react()
.alias({
  '@':path.join(__dirname, 'resources/js'),
  '@img':path.join(__dirname, 'resources/assets'),
  '@scss':path.join(__dirname, '/resources/scss')
});

mix.webpackConfig({
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '*': 'http://localhost:8000'
    }
  }
});