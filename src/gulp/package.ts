import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as shell from 'gulp-shell';
import * as sourcemaps from 'gulp-sourcemaps';
import * as replace from 'gulp-replace';

const m = require('merge-stream');

// -------------------------------------------------------------------------
// Package
// -------------------------------------------------------------------------

/**
 * Copies all sources to the package directory.
 */
gulp.task('packageCompile', () => {
  const tsProject = ts.createProject('tsconfig.json');
  const tsResult = gulp.src([
    './src/**/*.ts',
    '!./src/**/files/*.ts',
    '!./src/**/files/**/*.ts',
    '!./src/app/**',
    '!./src/modules/*/*.ts',
    '!./src/modules/*/!(api|entities)/*.ts',
    '!./src/modules/*/!(api|entities)/**/*.ts',
    '!./src/public_api.ts',
    './src/modules/*/+(api|entities)/*.ts',
    './src/modules/*/+(api|entities)/**/*.ts',
    '!./src/modules/app/**/*.ts',
  ])
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return [
    tsResult.dts.pipe(gulp.dest('./build/package')),
    tsResult.js
      .pipe(sourcemaps.write('.', {sourceRoot: '', includeContent: true}))
      .pipe(gulp.dest('./build/package'))
  ];

  return m(
    tsResult.dts.pipe(gulp.dest('./build/package')),
    tsResult.js
      .pipe(sourcemaps.write('.', {sourceRoot: '', includeContent: true}))
      .pipe(gulp.dest('./build/package'))
  );
});


gulp.task('packageNgCompile', () => {
  return gulp.src('bundles/package.json', {read: false})
    .pipe(shell([
      './node_modules/.bin/ng-packagr -p bundles/package.json'
    ]));
});

gulp.task('packageNgCopy', () => {
  return gulp.src([
    './src/modules/**/*.+(html|css|less|sass|scss)',
    '!./src/modules/*/api/**',
    '!./src/modules/*/entities/**',
    '!./src/modules/app/**'])
    .pipe(gulp.dest('./build/ngPackage/modules'));
});

gulp.task('packageNgMetadataCopy', () => {
  return gulp.src([
    './src/*.metadata.json'])
    .pipe(gulp.dest('./build/ngPackage'));
});


/**
 * Removes /// <reference from compiled sources.
 */
gulp.task('packageReplaceReferences', () => {
  return gulp.src('./build/package/**/*.d.ts')
    .pipe(replace(`/// <reference types="node" />`, ''))
    .pipe(replace(`/// <reference types="chai" />`, ''))
    .pipe(gulp.dest('./build/package'));
});

/**
 * Copies README.md into the package.
 */
gulp.task('packageCopyReadme', () => {
  return gulp.src('./README.md')
    .pipe(replace(/```typescript([\s\S]*?)```/g, '```javascript$1```'))
    .pipe(gulp.dest('./build/package'));
});

/**
 * Copies README.md into the package.
 */
gulp.task('packageCopyJsons', () => {
  return gulp.src([
    './src/**/*.json',
    '!./src/app/**',
    '!./src/modules/**']).pipe(gulp.dest('./build/package'));
});


/**
 * Copies README.md into the package.
 */
gulp.task('packageCopyHtml', () => {
  return gulp.src([
    './src/app/themes/**/*.html'])
    .pipe(gulp.dest('./build/package/app/themes'));
});


/**
 * Copies README.md into the package.
 */
gulp.task('packageCopyFiles', () => {
  return gulp.src('./src/**/files/*').pipe(gulp.dest('./build/package'));
});

/**
 * Copies Bin files.
 */
gulp.task('packageCopyBin', () => {
  return gulp.src('./bin/*').pipe(gulp.dest('./build/package/bin'));
});


/**
 * Copy package.json file to the package.
 */
gulp.task('packagePreparePackageFile', () => {
  return gulp.src('./package.json')
    .pipe(replace('"private": true,', '"private": false,'))
    .pipe(gulp.dest('./build/package'));
});


/**
 * Creates a package that can be published to npm.
 */
gulp.task('package', gulp.series(
  'clean',
  'packageNg',
  'packageCompile',
  'packageCopyBin',
  'packageCopyJsons',
  'packageCopyFiles',
  'packageCopyHtml',
  'packageReplaceReferences',
  'packagePreparePackageFile',
  'packageCopyReadme'
));

/**
 * Creates a package that can be published to npm.
 */
gulp.task('packageNoClean', gulp.series(
  'packageCompile',
  'packageNgCompile',
  gulp.parallel(
    'packageCopyBin',
    'packageCopyJsons',
    'packageCopyFiles',
    'packageCopyHtml',
    'packageReplaceReferences',
    'packagePreparePackageFile',
    'packageCopyReadme'
  )
));


/**
 * Creates a package that can be published to npm.
 */
gulp.task('packageNg', gulp.series(
  'ngClean',
  'packageNgCompile'
));

// gulp.task('watchPackage', () => {
//   return watch(["src/**/*.(ts|json|css|scss)"], {ignoreInitial: true, read: false}, (file: any) => {
//     sequence(["packageNoClean"]);
//   })
// });


// -------------------------------------------------------------------------
// Main Packaging and Publishing tasks
// -------------------------------------------------------------------------

/**
 * Publishes a package to npm from ./build/package directory.
 */
gulp.task('packagePublish', () => {
  return gulp.src('package.json', {read: false})
    .pipe(shell([
      'cd ./build/package && npm publish --access=public'
    ]));
});

gulp.task('packagePublishDev', () => {
  return gulp.src('package.json', {read: false})
    .pipe(shell([
      'cd ./build/package && npm publish --access=public --tag dev'
    ]));
});

gulp.task('packageNgPublish', () => {
  return gulp.src('build/ngPackage/package.json', {read: false})
    .pipe(shell([
      'cd ./build/ngPackage && npm publish --access=public'
    ]));
});

/**
 * Publishes a package to npm from ./build/package directory with @next tag.
 */
gulp.task('packagePublishNext', () => {
  return gulp.src('package.json', {read: false})
    .pipe(shell([
      'cd ./build/package && npm publish --tag next --access=public'
    ]));
});
