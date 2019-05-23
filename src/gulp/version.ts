import * as gulp from 'gulp';
import * as bump from 'gulp-bump';


// -------------------------------------------------------------------------
// Versioning
// -------------------------------------------------------------------------

function _bump(src: 'patch' | 'minor' | 'major') {
  return [
    gulp.src('package.json')
      .pipe(bump({type: src}))
      .pipe(gulp.dest('./')),
    gulp.src('bundles/package.json')
      .pipe(bump({type: src}))
      .pipe(gulp.dest('./bundles'))]
    ;

}

gulp.task('vpatch', () => {
  return _bump('patch');
});

gulp.task('vminor', () => {
  return _bump('minor');
});

gulp.task('vmajor', () => {
  return _bump('major');
});
