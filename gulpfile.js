import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cheerio from 'gulp-cheerio';
import concat from 'gulp-concat';
import csso from 'gulp-csso';
import sass from 'gulp-dart-sass';
import htmlmin from 'gulp-htmlmin';
import imagemin, { gifsicle, mozjpeg, optipng } from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import sourcemap from 'gulp-sourcemaps';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import terser from 'gulp-terser';
import webp from 'gulp-webp';
import { deleteAsync } from 'del';
import browserSync from 'browser-sync';

const { src, dest, series, parallel, watch } = gulp;

// Base directories
const dirs = {
  src: 'src',
  dest: 'build'
};

// File paths
const path = {
  styles: {
    root: `${dirs.src}/scss/`,
    compile: `${dirs.src}/scss/style.scss`,
    save: `${dirs.dest}/css/`
  },
  html: {
    root: `${dirs.src}/*.html`,
    save: `${dirs.dest}`
  },
  scripts: {
    root: `${dirs.src}/js/`,
    save: `${dirs.dest}/js/`
  },
  img: {
    root: `${dirs.src}/img/`,
    save: `${dirs.dest}/img/`,
    webp: `${dirs.dest}/img/webp/`
  },
  favicon: {
    root: `${dirs.src}/favicon`,
    save: `${dirs.dest}/favicon`
  }
};

// HTML
export const html = () => src(path.html.root)
  .pipe(htmlmin({
    removeComments: true,
    collapseWhitespace: true,
  }))
  .pipe(dest(path.html.save));

// Styles
export const styles = () => src(path.styles.compile)
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(csso())
  .pipe(concat('style.css'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemap.write('.'))
  .pipe(dest(path.styles.save));

// Scripts
export const scripts = () => src([`${path.scripts.root}**/*.js`, `!${path.scripts.root}**/*min.js`])
  .pipe(concat('main.js'))
  .pipe(terser())
  .pipe(rename({ suffix: '.min' }))
  .pipe(dest(path.scripts.save));

export const libs = () => src(`${path.scripts.root}**/*min.js`)
  .pipe(dest(path.scripts.save));

// Sprite
export const sprite = () => src(`${path.img.root}/icons/*.svg`)
  .pipe(svgmin({
    plugins: [
      { removeViewBox: false }
    ]
  }))
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
      $('[stroke]').removeAttr('stroke');
      $('[style]').removeAttr('style');
    },
    parserOptions: { xmlMode: true }
  }))
  .pipe(svgstore({ inlineSvg: true }))
  .pipe(rename('sprite.svg'))
  .pipe(dest(path.img.save));

// Imagemin
export const img = () => src(`${path.img.root}**/*`)
  .pipe(imagemin([
    gifsicle({interlaced: true}),
    mozjpeg({quality: 75, progressive: true}),
    optipng({optimizationLevel: 5}),
  ]))
  .pipe(dest(path.img.save));

// Favicon
export const favicon = () => src(`${path.favicon.root}**/*`)
  .pipe(dest(path.favicon.save));

// Create webp
export const createWebp = () => src(`${path.img.root}**/*.{jpg,jpeg,png}`)
  .pipe(webp({quality: 90}))
  .pipe(dest(path.img.webp));

// Copy
export const copy = () => src([
    `${dirs.src}/fonts/**/*`,
    `${path.img.root}**/*`,
    `${path.favicon.root}**/*`,
  ], {base: dirs.src})
.pipe(dest(dirs.dest));

// Fonts
export const fonts = () => src(`${dirs.src}/fonts/**/*`)
  .pipe(dest(`${dirs.dest}/fonts/`));

// Clean
export const clean = async () => await deleteAsync(dirs.dest);

// Server
export const devWatch = () => {
  browserSync.init({
    server: dirs.dest,
    notify: false,
    open: false,
  });
  watch(`${path.html.root}`, html).on('change', browserSync.reload);
  watch(`${path.styles.root}`, styles).on('change', browserSync.reload);
  watch(`${path.scripts.root}`, scripts).on('change', browserSync.reload);
  watch([`${path.img.root}`, `${dirs.src}/fonts/`], copy).on('change', browserSync.reload);
};

// Develop
export const dev = series(clean, parallel(html, styles, scripts, libs, sprite, copy), devWatch);

// Build
export const build = series(clean, parallel(html, styles, scripts, sprite, img, favicon, fonts));
