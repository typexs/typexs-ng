/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {join} from 'path';
import {strings} from '@angular-devkit/core';
import * as ts from 'typescript';
import * as _ from 'lodash';


import {
  MergeStrategy,
  Rule,
  SchematicContext,
  Tree,
  apply,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  schematic,
  externalSchematic,
  template,
  url,
  FileEntry,
  FileOperator,
  forEach as forEachOp, asSource

} from '@angular-devkit/schematics';
import {Schema as ApplicationOptions} from './schema';
import {forEach} from "@angular/router/src/utils/collection";
import * as fs from 'fs';
import {SimpleRegexCodeModifierHelper, PlatformUtils, FileUtils} from "typexs-base";
import {addToViewTree} from "@angular/core/src/render3/instructions";


function minimalPathFilter(path: string): boolean {
  const toRemoveList: RegExp[] = [/e2e\//, /editorconfig/, /README/, /karma.conf.js/,
    /protractor.conf.js/, /test.ts/, /tsconfig.spec.json/,
    /tslint.json/, /favicon.ico/];

  return !toRemoveList.some(re => re.test(path));
}


function cleanupFilter(path: string): boolean {
  const toRemoveList: RegExp[] = [/README.md/,
    /karma\.conf\.js/, /\.angular-cli\.json/, /package\.json/, /protractor\.conf\.js/,/tsconfig\.(app|spec)\.json/,/styles\./,/app\.module\.ts/];

  return toRemoveList.some(re => re.test(path));
}

export default function (options: ApplicationOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    options['typexs_ng_version'] = ">=0.0.2";
    options['version'] = ">=1.6.8";

    let overwrites: any[] = [];
    const virtualRootDir = '/';
    const realRootDir = host.root['_host']['_root'];

    const upgradeProject = PlatformUtils.fileExist(PlatformUtils.join(realRootDir, 'package.json'));

    if (upgradeProject) {
      let json = JSON.parse(fs.readFileSync(PlatformUtils.join(realRootDir, 'package.json')).toString('utf-8'));
      let basename = PlatformUtils.basename(realRootDir);
      options.name = json.name;
      options.directory = basename;
    } else {
      if (!options.name) {
        options.name = 'ng-app';
      }
      if (!options.directory) {
        options.directory = 'ng-app';
      }
    }

    options.sourceDir = 'src';

    let optionsOverwrite = _.clone(options);
    optionsOverwrite.sourceDir = 'src/app';
    optionsOverwrite.appmoduledir = 'src/modules/app';



    // TODO check if schematics exists ...

    return chain([

      mergeWith(
        apply(
          asSource(externalSchematic('@schematics/angular', 'application', options)),
          [
            (tree: Tree, context: SchematicContext) => Tree.optimize(tree),
            upgradeProject ? move(options.directory, virtualRootDir) : noop(),
            (tree: Tree, context: SchematicContext) => {
              tree.visit((path, entry) => {
                if (cleanupFilter(path)) {
                  tree.delete(path);
                } else if ([/\/src\/app\/(?!modules\/)/].some(r => r.test(path))) {
                  tree.rename(path, path.replace('/src/app/', '/src/modules/app/'))
                } else if ([/\/src\/(?!app)/].some(r => r.test(path))) {
                  tree.rename(path, path.replace('/src/', '/src/app/'))
                }
              })

              let modulePath = upgradeProject ? '/src/app/main.ts' : '/' + options.directory + '/src/app/main.ts';
              const text = tree.read(modulePath);
              let sourceText = text.toString('utf-8');
              sourceText = sourceText.replace('./app/app.module', './../modules/app/app.module');
              tree.overwrite(modulePath, sourceText);
              return Tree.optimize(tree);
            },
            (tree: Tree, context: SchematicContext) => {
              tree.visit((path, entry) => {
                let filepath = join(realRootDir, path);
                if (fs.existsSync(filepath)) {
                  tree.delete(path);
                }
              })
              return Tree.optimize(tree);
            }
          ]), MergeStrategy.AllowCreationConflict
      ),
      mergeWith(
        apply(url('./files'), [

          options.minimal ? filter(minimalPathFilter) : noop(),
          template({
            utils: strings,
            ...optionsOverwrite,
            'dot': '.',
            sourcedir: optionsOverwrite.sourceDir
          }),
          (tree: Tree, context: SchematicContext) => {
            tree.visit((path: string, entry) => {
              let filepath = join(realRootDir, path);
              if (fs.existsSync(filepath)) {

                if (/package\.json/.test(path)) {
                  let local = tree.read(path);
                  let jsonNew = JSON.parse(local.toString('utf-8'));
                  let json = JSON.parse(fs.readFileSync(filepath).toString('utf-8'));

                  let updated = false;
                  ['dependencies', 'devDependencies', 'scripts','peerDependencies'].forEach(_key => {
                    if(jsonNew[_key]){
                      Object.keys(jsonNew[_key]).forEach(_d => {
                        if (!json[_key][_d]) {
                          json[_key][_d] = jsonNew[_key][_d];
                          updated = true;
                        }
                      });
                    }
                  });

                  if (updated) {
                    overwrites.push({path: path, content: JSON.stringify(json, null, 2)})
                  }
                } else if (/gulpfile\.ts/.test(path)) {
                  let local = tree.read(path);
                  let localStr = local.toString('utf-8');
                  let exist = fs.readFileSync(filepath).toString('utf-8');

                  let newContent = SimpleRegexCodeModifierHelper.copyMethods(exist, localStr);
                  newContent = SimpleRegexCodeModifierHelper.copyImports(newContent, localStr);

                  if (newContent.length !== exist.length) {
                    overwrites.push({path: path, content: newContent});
                  }
                }
                tree.delete(path);
              }
            });

            tree = Tree.optimize(tree);


            return tree;
          },
          upgradeProject ? noop() : move(options.directory),
        ]), MergeStrategy.AllowCreationConflict),
      (tree: Tree, context: SchematicContext) => {
        overwrites.forEach(x => {
          tree.overwrite(x.path, x.content)
        })
        return tree;
      }
    ])(host, context);
  };
}
