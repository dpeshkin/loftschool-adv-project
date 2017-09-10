const gulp = require('gulp'),
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
    replace = require('gulp-replace'),
    sassLint = require('gulp-sass-lint');

//paths
const paths = {
    root: './docs',
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'docs/assets/styles/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'docs/assets/scripts/'
    },
    templates: {
        src: 'src/templates/',
        dest: 'docs/assets/'
    },
    images: {
        src: 'src/images/**/*.{jpg,svg,png}',
        dest: 'docs/assets/images/'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'docs/assets/fonts/'
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
    return gulp.src(paths.templates.src + "pages/*.pug")
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

//sass compile
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sassLint({
            rules: {
                "class-name-format": 0,
                "property-sort-order": 0,
                "no-color-literals": 0,
                "indentation": [
                    1,
                    {
                        'size': 4
                    }
                ]
            }
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
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

// docs images
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

// docs fonts
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

// watch
function watch() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, html);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.fonts.src, fonts);
}

// browserSync
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.{html,css}', browserSync.reload);
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

// Функция для линтинга, она закоментирована, тк пайпнута к sass таску
// function lint() {
//     return gulp.src(paths.styles.src)
//         .pipe(sassLint({
//             rules: {
//                 "class-name-format": 0,
//                 "property-sort-order": 0,
//                 "no-color-literals": 0,
//                 "indentation": [
//                     1,
//                     {
//                         'size': 4
//                     }
//                 ]
//             }
//         }))
//         .pipe(sassLint.format())
//         .pipe(sassLint.failOnError())
// }


exports.html = html;
exports.styles = styles;
exports.clean = clean;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.watch = watch;
exports.server = server;
// exports.lint = lint;
exports.sprite = sprite; // этот модуль не будем вносить в gulp.task тк его нужно запустить всего 1 раз чтобы сделать svg-спрайт, для запуска набрать в консоли gulp sprite

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, html, scripts, images, fonts),
    gulp.parallel(watch, server)
));