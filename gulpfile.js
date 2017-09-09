const   gulp = require('gulp'),
        del = require('del'),
        browserSync = require('browser-sync').create(),
        pug = require('gulp-pug'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        rename = require('gulp-rename'),
        sourcemaps = require('gulp-sourcemaps'),
        gulpWebpack = require('gulp-webpack'),
        webpack = require('webpack'),
        webpackConfig = require('./webpack.config.js'),
        svgSprite = require('gulp-svg-sprites'),
        svgmin = require('gulp-svgmin'),
        cheerio = require('gulp-cheerio'),
        replace = require('gulp-replace');

//paths
const paths = {
    root: './dist',
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'dist/assets/styles/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/assets/scripts/'
    },
    templates: {
        src: 'src/templates/',
        dest: 'dist/assets/'
    },
    images: {
        src: 'src/images/**/*.{jpg,svg,png}',
        dest: 'dist/assets/images/'
    },
    icons: {
        src: 'src/svg-icons/*.svg',
        dest: 'src/images/'
    }
};

// clean build
function clean() {
    return del(paths.root);
}

//server
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

//pug compile
function html() {
    return gulp.src(paths.templates.src+"pages/*.pug")
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

//sass compile
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())        
        .pipe(gulp.dest(paths.styles.dest))       
}

// webpack
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}

// dist images
function images() {
    return gulp.src(paths.images.src)
          .pipe(gulp.dest(paths.images.dest));
}

// watch
function watch() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, html);
    gulp.watch(paths.images.src, images);
}

// browserSync
function server() {
    browserSync.init({
        server: paths.root   
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// SVG-sprite, делает спрайт и сохраняет его в папку src/images, откуда он будет экспортирован таском gulp.images
function sprite() {
	return gulp.src(paths.icons.src)
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
            mode: "symbols",
            svg: {
                symbols: 'icons/sprite.svg'
            }
        }))
		.pipe(gulp.dest(paths.icons.dest));
}


exports.html = html;
exports.styles = styles;
exports.clean = clean;
exports.scripts = scripts;
exports.images = images;
exports.watch = watch;
exports.server = server;
exports.sprite = sprite; // этот модуль не будем вносить в gulp.task тк его нужно запустить всего 1 раз чтобы сделать svg-спрайт, для запуска набрать в консоли gulp sprite

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, scripts, html, images),
    gulp.parallel(watch, server)
));