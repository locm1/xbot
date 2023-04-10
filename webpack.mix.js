const mix = require('laravel-mix');
require('mix-env-file');
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

// Then pass your file to this plugin
// If this is not set, this plugin won't do anything and the default .env variables will remain
mix.env(process.env.ENV_FILE);