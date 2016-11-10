const path = require('path');
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
  gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
    .pipe(tslint({
      formatter: 'stylish',
      formattersDir: path.resolve('node_modules/tslint-stylish'),
    }))
    .pipe(tslint.report({
      emitError: true,
      sort: true,
      summarizeFailureOutput: true
    }));
});

gulp.task('codegen', () => {
  gulp.src('src/routes.yml')
    .pipe(compileRoutes('src/routes.ts'))
    .pipe(gulp.dest('src'));

  gulp.src('src/routes.yml')
    .pipe(compileRoutes('src/serverRoutes.ts', true))
    .pipe(gulp.dest('src'));
});

gulp.task('check', ['codegen', 'tsc', 'tslint']);

function webpackServer(env) {
  process.env.NODE_ENV = env;

  const clientConfig = require('./webpack.client.config.js');
  const clientCompiler = webpack(clientConfig);
  new WebpackDevServer(clientCompiler, {
    hot: true,
    inline: false,
    historyApiFallback: true,
    compress: true,
    stats: { colors: true },
  }).listen(3000, 'localhost', err => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
  });

  const serverConfig = Object.assign(require('./webpack.server.config.js'), { watch: true });
  const serverCompiler = webpack(serverConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack-server', err);
    }
    gutil.log('[webpack-server]', stats.toString());
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

  const webpackCallback = resolve => (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString());
    resolve();
  };
  
  Promise.all([
    new Promise(resolve => {
      const webpackConfig = require('./webpack.client.config.js');
      webpack(webpackConfig, webpackCallback(resolve));
    }),
    new Promise(resolve => {
      const webpackConfig = require('./webpack.server.config.js');
      webpack(webpackConfig, webpackCallback(resolve));
    }),
  ]).then(callback);
});

gulp.task('default', ['codegen', 'tsc', 'tslint', 'webpack']);
