"use strict";

var _require = require('gulp'),
    src = _require.src,
    dest = _require.dest,
    series = _require.series,
    watch = _require.watch;

var autoprefixer = require('gulp-autoprefixer');

var cleanCSS = require('gulp-clean-css');

var del = require('del');

var browserSync = require('browser-sync').create();

var sass = require('sass');

var gulpSass = require('gulp-sass');

var svgSprite = require('gulp-svg-sprite');

var svgmin = require('gulp-svgmin');

var cheerio = require('gulp-cheerio');

var replace = require('gulp-replace');

var fileInclude = require('gulp-file-include');

var rev = require('gulp-rev');

var revRewrite = require('gulp-rev-rewrite');

var revDel = require('gulp-rev-delete-original');

var htmlmin = require('gulp-htmlmin');

var gulpif = require('gulp-if');

var notify = require('gulp-notify');

var image = require('gulp-imagemin');

var _require2 = require('fs'),
    readFileSync = _require2.readFileSync;

var typograf = require('gulp-typograf');

var mainSass = gulpSass(sass);

var webpackStream = require('webpack-stream');

var plumber = require('gulp-plumber');

var path = require('path');

var zip = require('gulp-zip');

var rootFolder = path.basename(path.resolve()); // paths

var srcFolder = './src';
var buildFolder = './app';
var paths = {
  srcSvg: "".concat(srcFolder, "/img/svg/**.svg"),
  srcImgFolder: "".concat(srcFolder, "/img"),
  buildImgFolder: "".concat(buildFolder, "/img"),
  srcScss: "".concat(srcFolder, "/scss/**/*.scss"),
  buildCssFolder: "".concat(buildFolder, "/css"),
  srcFullJs: "".concat(srcFolder, "/js/**/*.js"),
  srcMainJs: "".concat(srcFolder, "/js/main.js"),
  buildJsFolder: "".concat(buildFolder, "/js"),
  srcPartialsFolder: "".concat(srcFolder, "/html"),
  resourcesFolder: "".concat(srcFolder, "/resources")
};
var isProd = false; // dev by default

var clean = function clean() {
  return del([buildFolder]);
}; //svg sprite


var svgSprites = function svgSprites() {
  return src(paths.srcSvg).pipe(svgmin({
    js2svg: {
      pretty: true
    }
  })).pipe(cheerio({
    run: function run($) {
      $('[fill]').removeAttr('fill');
    },
    parserOptions: {
      xmlMode: true
    }
  })).pipe(replace('&gt;', '>')).pipe(svgSprite({
    mode: {
      stack: {
        sprite: "../sprite.svg"
      }
    }
  })).pipe(dest(paths.buildImgFolder));
}; // scss styles


var styles = function styles() {
  return src(paths.srcScss, {
    sourcemaps: !isProd
  }).pipe(plumber(notify.onError({
    title: "SCSS",
    message: "Error: <%= error.message %>"
  }))).pipe(mainSass()).pipe(autoprefixer({
    cascade: false,
    grid: true,
    overrideBrowserslist: ["last 5 versions"]
  })).pipe(gulpif(isProd, cleanCSS({
    level: 2
  }))).pipe(dest(paths.buildCssFolder, {
    sourcemaps: '.'
  })).pipe(browserSync.stream());
}; // styles backend


var stylesBackend = function stylesBackend() {
  return src(paths.srcScss).pipe(plumber(notify.onError({
    title: "SCSS",
    message: "Error: <%= error.message %>"
  }))).pipe(mainSass()).pipe(autoprefixer({
    cascade: false,
    grid: true,
    overrideBrowserslist: ["last 5 versions"]
  })).pipe(dest(paths.buildCssFolder)).pipe(browserSync.stream());
}; // scripts


var scripts = function scripts() {
  return src(paths.srcMainJs).pipe(plumber(notify.onError({
    title: "JS",
    message: "Error: <%= error.message %>"
  }))).pipe(webpackStream({
    mode: isProd ? 'production' : 'development',
    entry: {
      vendor: './src/js/vendor.js',
      main: './src/js/main.js'
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist'
    },
    module: {
      rules: [{
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: "defaults"
            }]]
          }
        }
      }]
    },
    devtool: !isProd ? 'source-map' : false
  })).on('error', function (err) {
    console.error('WEBPACK ERROR', err);
    this.emit('end');
  }).pipe(dest(paths.buildJsFolder)).pipe(browserSync.stream());
}; // scripts backend


var scriptsBackend = function scriptsBackend() {
  return src(paths.srcMainJs).pipe(plumber(notify.onError({
    title: "JS",
    message: "Error: <%= error.message %>"
  }))).pipe(webpackStream({
    mode: 'development',
    output: {
      filename: 'main.js'
    },
    module: {
      rules: [{
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: "defaults"
            }]]
          }
        }
      }]
    },
    devtool: false
  })).on('error', function (err) {
    console.error('WEBPACK ERROR', err);
    this.emit('end');
  }).pipe(dest(paths.buildJsFolder)).pipe(browserSync.stream());
};

var resources = function resources() {
  return src("".concat(paths.resourcesFolder, "/**")).pipe(dest(buildFolder));
};

var images = function images() {
  return src(["".concat(paths.srcImgFolder, "/**/**.{jpg,jpeg,png,svg}")]).pipe(gulpif(isProd, image([image.mozjpeg({
    quality: 80,
    progressive: true
  }), image.optipng({
    optimizationLevel: 2
  })]))).pipe(dest(paths.buildImgFolder));
};

var htmlInclude = function htmlInclude() {
  return src(["".concat(srcFolder, "/*.html")]).pipe(fileInclude({
    prefix: '@',
    basepath: '@file'
  })).pipe(typograf({
    locale: ['ru', 'en-US']
  })).pipe(dest(buildFolder)).pipe(browserSync.stream());
};

var watchFiles = function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "".concat(buildFolder)
    }
  });
  watch(paths.srcScss, styles);
  watch(paths.srcFullJs, scripts);
  watch("".concat(paths.srcPartialsFolder, "/*.html"), htmlInclude);
  watch("".concat(paths.srcPartialsFolder, "/**/*.html"), htmlInclude);
  watch("".concat(srcFolder, "/*.html"), htmlInclude);
  watch("".concat(srcFolder, "/**/*.html"), htmlInclude);
  watch("".concat(paths.resourcesFolder, "/**"), resources);
  watch("".concat(paths.srcImgFolder, "/**/**.{jpg,jpeg,png,svg}"), images);
  watch(paths.srcSvg, svgSprites);
};

var cache = function cache() {
  return src("".concat(buildFolder, "/**/*.{css,js,svg,png,jpg,jpeg,webp,avif,woff2}"), {
    base: buildFolder
  }).pipe(rev()).pipe(revDel()).pipe(dest(buildFolder)).pipe(rev.manifest('rev.json')).pipe(dest(buildFolder));
};

var rewrite = function rewrite() {
  var manifest = readFileSync('app/rev.json');
  src("".concat(paths.buildCssFolder, "/*.css")).pipe(revRewrite({
    manifest: manifest
  })).pipe(dest(paths.buildCssFolder));
  return src("".concat(buildFolder, "/**/*.html")).pipe(revRewrite({
    manifest: manifest
  })).pipe(dest(buildFolder));
};

var htmlMinify = function htmlMinify() {
  return src("".concat(buildFolder, "/**/*.html")).pipe(htmlmin({
    collapseWhitespace: true
  })).pipe(dest(buildFolder));
};

var zipFiles = function zipFiles(done) {
  del.sync(["".concat(buildFolder, "/*.zip")]);
  return src("".concat(buildFolder, "/**/*.*"), {}).pipe(plumber(notify.onError({
    title: "ZIP",
    message: "Error: <%= error.message %>"
  }))).pipe(zip("".concat(rootFolder, ".zip"))).pipe(dest(buildFolder));
};

var toProd = function toProd(done) {
  isProd = true;
  done();
};

exports["default"] = series(clean, htmlInclude, scripts, styles, resources, images, svgSprites, watchFiles);
exports.backend = series(clean, htmlInclude, scriptsBackend, stylesBackend, resources, images, svgSprites);
exports.build = series(toProd, clean, htmlInclude, scripts, styles, resources, images, svgSprites, htmlMinify);
exports.cache = series(cache, rewrite);
exports.zip = zipFiles;