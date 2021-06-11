import * as gulp from 'gulp';
import del from 'del';


/**
 * ngCleans build folder.
 */
gulp.task('ngClean', () => {
  return del(['./build/ngPackage/**']);
});
