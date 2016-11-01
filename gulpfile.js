const gulp = require('gulp');
const gutil = require('gulp-util');
const tslint = require('gulp-tslint');
const stylish = require('tslint-stylish');
const typescript = require('gulp-typescript');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const compileRoutes = require('./compileRoutes');

const tsProject = typescript.createProject('tsconfig.json');

gulp.task('tsc', () => {
  tsProject.src()
    .pipe(tsProject());
});

gulp.task('tslint', () => {
  gulp.src('src/**/*.ts?')
    .pipe(tslint())
    .pipe(tslint.report(stylish, {
      emitError: false,
      sort: true
    }));
});

gulp.task('codegen', () => {
  gulp.src('src/routes.yml')
    .pipe(compileRoutes())
    .pipe(gulp.dest('src'));
});

gulp.task('check', ['codegen', 'tsc', 'tslint']);

function webpackServer(env) {
  process.env.NODE_ENV = env;
  const webpackConfig = require('./webpack.config.js');
  const compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, { inline: false, historyApiFallback: true, compress: true })
    .listen(3000, 'localhost', err => {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
    });
}

gulp.task('dev-server', () => {
  webpackServer('development');
});

gulp.task('prod-server', () => {
  webpackServer('production');
});

gulp.task('dev', ['codegen', 'dev-server']);

gulp.task('webpack', callback => {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
  }
  const webpackConfig = require('./webpack.config.js');
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString());
    callback();
  });
});

gulp.task('default', ['codegen', 'tsc', 'tslint', 'webpack']);
