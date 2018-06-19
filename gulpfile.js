/**
 * gulpfile
 */
const fs = require('fs')
const path = require('path')

const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const runSequence = require('run-sequence')

// load all gulp plugins
const plugins = gulpLoadPlugins()
const env = process.env.NODE_ENV || 'development'
const isProduction = () => env === 'production'

/**
 * Compile styles/app.scss
 */
gulp.task('compile-scss-app', () => {
  return gulp.src(['scss/app.scss'], {base: './scss'})
    .pipe(plugins.autoprefixer())
    .pipe(plugins.plumber())
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.if(isProduction, plugins.cssnano({ compatibility: '*' })))
    .pipe(plugins.rename(function (path) {
      path.extname = ".acss"
    }))
    .pipe(gulp.dest('./source'))
})

/**
 * Compile scss/pages/*.scss
 */
gulp.task('compile-scss-page', () => {
  return gulp.src(['scss/pages/*.scss'], {base: './scss/pages'})
    .pipe(plugins.autoprefixer())
    // .pipe(plugins.sourcemaps.init())
    .pipe(plugins.plumber())
    // 其他样式无效
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.if(isProduction, plugins.cssnano({ compatibility: '*' })))
    .pipe(plugins.rename(function (path) {
      path.dirname += '/' + path.basename;
      path.extname = ".acss"
    }))
    // .pipe(plugins.if(!isProduction, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest('source/pages'))
})

/**
 * Compile styles/components/*.scss
 */
gulp.task('compile-scss-components', () => {
    return gulp.src(['scss/components/*.scss'], {base: './scss/components'})
        .pipe(plugins.autoprefixer())
        .pipe(plugins.plumber())
        .pipe(plugins.sass({outputStyle: 'compressed'}))
        .pipe(plugins.if(isProduction, plugins.cssnano({ compatibility: '*' })))
        .pipe(plugins.rename(function (path) {
            path.dirname += '/' + path.basename;
            path.extname = ".acss"
        }))
        .pipe(gulp.dest('source/components'))
})

/**
 * Compile all tasks
 */
gulp.task('compile', [/* 'clean' */], next => {
  runSequence([
    'compile-scss-app',
    'compile-scss-components',
    'compile-scss-page',
  ], next)
})

/**
 * Build
 */
gulp.task('build', next => runSequence(['compile'], next))

/**
 * Watch source change
 */
gulp.task('watch', ['build'], () => {
    gulp.watch('scss/**/*.scss', ['build'])
})

/**
 * Default task
 */
gulp.task('default', ['watch'])
