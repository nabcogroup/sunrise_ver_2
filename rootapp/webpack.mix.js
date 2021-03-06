const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.js('resources/assets/js/app.js', '../../js')

   .sass('resources/assets/sass/app.scss', '../../css');

mix.sass('resources/assets/sass/vendor.scss', '../../css');
mix.js('resources/assets/js/vendor.js', '../../js');


mix.sass('resources/assets/sass/login.scss','../../css');

mix.styles(['node_modules/fullcalendar/dist/fullcalendar.css'], '../../css');