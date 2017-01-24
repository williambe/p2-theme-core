'use strict';
const svgSprite = require('gulp-svg-sprite');
const del = require('del');

module.exports = (gulp, config, tasks) => {
  function spriteSvg(done) {
    gulp.src(config.svgs.src)
    .pipe(svgSprite(config.svgs.configSvgs)) // configSVG
    .pipe(gulp.dest(config.svgs.dest));
    done();
  }

  spriteSvg.description = 'Sprite from SVG files';

  gulp.task('svgs', spriteSvg);

  function watchSvgs() {
    const src = [config.svgs.src];
    if (config.svgs.enabled) {
      src.push(config.svgs.src);
    }
    return gulp.watch(src, spriteSvg);
  }

  gulp.task('watch:svgs', watchSvgs);

  gulp.task('clean:svgs', (done) => {
    del([config.svgs.dest], { force: true }).then(() => {
      done();
    });
  });


  tasks.watch.push('watch:svgs');
  tasks.compile.push('svgs');
  tasks.clean.push('clean:svgs');
};
