'use strict';
const svgSprite = require('gulp-svg-sprite');

// SVG Config
// var config = {
//   mode: {
//     symbol: { // symbol mode to build the SVG
//       dest: 'sprite', // destination foldeer
//       sprite: 'sprite.svg', //sprite name
//       example: true // Build sample page
//     }
//   },
//   svg: {
//     xmlDeclaration: false, // strip out the XML attribute
//     doctypeDeclaration: false // don't include the !DOCTYPE declaration
//   }
// };

module.exports = (gulp, config, tasks) => {
	function spriteSvg(done, errorShouldExit) {
		gulp.src(config.svgs.src)
		.pipe(svgSprite(config.svgs.mode))
		.pipe(gulp.dest(config.svgs.dest));
	}
};

gulp.task('svgs', spriteSvg);
// gulp.task('sprite-page', function() {
//   return gulp.src('svg/**/*.svg')
//     .pipe(svgSprite(config))
//     .pipe(gulp.dest('.'));
// });

// gulp.task('sprite-shortcut', function() {
//   return gulp.src('sprite/sprite.svg')
//     .pipe(gulp.dest('.'));
// });

// gulp.task('default', ['sprite-page', 'sprite-shortcut']);