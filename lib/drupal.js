'use strict';
var exec = require('child_process').execSync;
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var _ = require('lodash');

function sh(cmd) {
  console.log(exec(cmd, {encoding: 'utf8'}));
}
module.exports = function (gulp, config, tasks) {

  var reload;
  if (config.browserSync.enabled) {
    reload = require('browser-sync').get('server').reload;
  } else {
    reload = function(x) {return x;};
  }
  
  gulp.task('watch:drupal', function() {
    gulp.watch(config.drupal.watch, function() {
      sh('cd ' + config.drupal.dir + ' && ' + config.drupal.command);
      reload();
    });
  });

  gulp.task('inject:drupal', function() {
    if (_.endsWith(config.drupal.inject.file, '.info')) {
      // Drupal 7
    var target = gulp.src(config.drupal.inject.file);
    var sources = [config.css.dest + '*.css'];
    if (config.drupal.inject.bower) {
      sources = sources.concat(bowerFiles({
        includeDev: false
      }));
    }
    return target.pipe(inject(gulp.src(sources), {
        relative: true,
        ignorePath: '../',
        starttag: '; inject:{{ext}}',
        endtag: '; endinject',
        transform: function(filepath) {
          if (_.endsWith(filepath, 'js')) {
            return 'scripts[] = ' + filepath;
          }
          if (_.endsWith(filepath, 'css')) {
            return 'stylesheets[all][] = ' + filepath;
          } 
        }
      }))
      .pipe(gulp.dest('./'));
    } else if(_.endsWith(config.drupal.inject.file, '.info.yml')){
      console.log('Drupal 8 support not ready yet for injecting into ' + config.drupal.inject.file);
    } else {
      console.log('Not a them file we understand for injecting dependencies into: ' + config.drupal.inject.file);
      console.log('Check config.yml under drupal.inject.file');
    }
  });

  gulp.task('watch:inject:drupal', function() {
    var files = ['./config.yml'];
    if (config.patternLab.injectBower) {
      files.push('./bower.json');
    }
    return gulp.watch(files, ['inject:drupal']);
  });

  tasks.compile.push('inject:drupal');
  tasks.watch.push('watch:inject:drupal');
  tasks.watch.push('watch:drupal');

};