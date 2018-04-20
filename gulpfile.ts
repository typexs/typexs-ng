import {Gulpclass, Task, SequenceTask, MergedTask} from "gulpclass";


import * as fs from 'fs';
import * as glob from 'glob';
import * as gulp from 'gulp';
import * as watch from 'gulp-watch';
//import * as ts from "gulp-typescript";



const bump = require('gulp-bump');
const del = require("del");
const shell = require("gulp-shell");
const replace = require("gulp-replace");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");
const sequence = require('run-sequence');


@Gulpclass()
export class Gulpfile {


  /**
   * Cleans build folder.
   */
  @Task()
  clean(cb: Function) {
    return del(["./build/**"], cb);
  }

  /**
   * Runs typescript files compilation.
   */
  @Task()
  compile() {
    return gulp.src("package.json", {read: false})
      .pipe(shell(["tsc"]));
  }

  // -------------------------------------------------------------------------
  // Create / Update index.ts
  // -------------------------------------------------------------------------

  /**
   * Generate index.ts declaration
   */
  @Task()
  generateIndexTs() {
    let _glob = glob.sync('src/**').filter((f: string) => /\.ts$/.test(f) && !/^(src\/packages|src\/index\.ts$)/.test(f));
    let forIndexTs: string[] = ['// ---- Generated by gulp task ----'];
    let indexTs = '';
    let settings: any = {};
    if (fs.existsSync('./.typexs.json')) {
      settings = require('./.typexs.json');
      if (settings.packageExports) {
        settings.packageExports.forEach((f: string) => {
          forIndexTs.push(`export * from "${f}";`);
        })
      }
    }
    _glob.forEach((f: string) => {
      if (!/\/\/ index\.ts ignore/.test(fs.readFileSync(f).toString('utf-8'))) {
        forIndexTs.push(`export * from "./${f.replace(/(^src\/)|((\.d)?\.ts$)/g, '')}";`);
      }
    });
    fs.writeFileSync('./src/index.ts', forIndexTs.join('\n'));
    return;
  }


  // -------------------------------------------------------------------------
  // Package
  // -------------------------------------------------------------------------

  /**
   * Copies all sources to the package directory.
   */
  @MergedTask()
  packageCompile() {
    const tsProject = ts.createProject("tsconfig.json");
    const tsResult = gulp.src([
      "./src/**/*.ts",
      "!./src/**/files/*.ts",
      "!./src/**/files/**/*.ts",
      "!./src/app/**",
      "!./src/modules/app/**",
      "./node_modules/@types/**/*.ts"])
      .pipe(sourcemaps.init())
      .pipe(tsProject());

    return [
      tsResult.dts.pipe(gulp.dest("./build/package")),
      tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: "", includeContent: true}))
        .pipe(gulp.dest("./build/package"))
    ];
  }

  /**
   * Removes /// <reference from compiled sources.
   */
  @Task()
  packageReplaceReferences() {
    return gulp.src("./build/package/**/*.d.ts")
      .pipe(replace(`/// <reference types="node" />`, ""))
      .pipe(replace(`/// <reference types="chai" />`, ""))
      .pipe(gulp.dest("./build/package"));
  }

  /**
   * Copies README.md into the package.
   */
  @Task()
  packageCopyReadme() {
    return gulp.src("./README.md")
      .pipe(replace(/```typescript([\s\S]*?)```/g, "```javascript$1```"))
      .pipe(gulp.dest("./build/package"));
  }

  /**
   * Copies README.md into the package.
   */
  @Task()
  packageCopyJsons() {
    return gulp.src(["./src/**/*.json","!./src/app/**","!./src/modules/app/**"]).pipe(gulp.dest("./build/package"));
  }

  /**
   * Copies README.md into the package.
   */
  @Task()
  packageCopyHtml() {
    return gulp.src(["./src/app/themes/**/*.html"]).pipe(gulp.dest("./build/package/app/themes"));
  }

  /**
   * Copies README.md into the package.
   */
  @Task()
  packageCopyFiles() {
    return gulp.src("./src/**/files/*").pipe(gulp.dest("./build/package"));
  }

  /**
   * Copies Bin files.
   */
  @Task()
  packageCopyBin() {
    return gulp.src("./bin/*").pipe(gulp.dest("./build/package/bin"));
  }


  /**
   * Copy package.json file to the package.
   */
  @Task()
  packagePreparePackageFile() {
    return gulp.src("./package.json")
      .pipe(replace("\"private\": true,", "\"private\": false,"))
      .pipe(gulp.dest("./build/package"));
  }


  /**
   * Creates a package that can be published to npm.
   */
  @SequenceTask()
  package() {
    return [
      "clean",
      "packageCompile",
      [
        "packageCopyBin",
        "packageCopyJsons",
        "packageCopyFiles",
        "packageCopyHtml",
        "packageReplaceReferences",
        "packagePreparePackageFile",
        "packageCopyReadme",
      ],
    ];
  }


  /**
   * Creates a package that can be published to npm.
   */
  @SequenceTask()
  packageNoClean() {
    return [

      "packageCompile",
      [
        "packageCopyBin",
        "packageCopyJsons",
        "packageCopyFiles",
        "packageCopyHtml",
        "packageReplaceReferences",
        "packagePreparePackageFile",
        "packageCopyReadme",
      ],
    ];
  }


  @SequenceTask("watchPackage")
  watchPackage(): any {
    return watch(["src/**/*.(ts|json|css|scss)"], {ignoreInitial: false, read: false}, (file: any) => {
      sequence([ "packageNoClean"]);
    })

  }

  // -------------------------------------------------------------------------
  // Main Packaging and Publishing tasks
  // -------------------------------------------------------------------------

  /**
   * Publishes a package to npm from ./build/package directory.
   */
  @Task()
  packagePublish() {
    return gulp.src("package.json", {read: false})
      .pipe(shell([
        "cd ./build/package && npm publish"
      ]));
  }

  /**
   * Publishes a package to npm from ./build/package directory with @next tag.
   */
  @Task()
  packagePublishNext() {
    return gulp.src("package.json", {read: false})
      .pipe(shell([
        "cd ./build/package && npm publish --tag next"
      ]));
  }


  // -------------------------------------------------------------------------
  // Versioning
  // -------------------------------------------------------------------------

  @Task()
  vpatch() {
    return gulp.src('package.json')
      .pipe(bump({type: "patch"}))
      .pipe(gulp.dest('./'));
  }

  @Task()
  vminor() {
    return gulp.src('package.json')
      .pipe(bump({type: "minor"}))
      .pipe(gulp.dest('./'));
  }

  @Task()
  vmajor() {
    return gulp.src('package.json')
      .pipe(bump({type: "major"}))
      .pipe(gulp.dest('./'));
  }


}
