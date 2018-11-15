import * as semver from 'semver';
import {join} from 'path';
import {strings} from '@angular-devkit/core';
import * as _ from 'lodash';

import {FileUtils, PlatformUtils, SimpleRegexCodeModifierHelper} from '@typexs/base';
import {
  apply,
  chain,
  empty,
  externalSchematic,
  filter,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import {Schema as ApplicationOptions} from './schema';
import * as fs from 'fs';
//import {Schema as WorkspaceSchema} from "@schematics/angular/workspace/schema";
import {Schema as ApplicationSchema} from '@schematics/angular/application/schema';
import {SimpleFileEntry} from '@angular-devkit/schematics/src/tree/entry';


function minimalPathFilter(path: string): boolean {
  const toRemoveList: RegExp[] = [
    /e2e\//, /editorconfig/, /README/, /karma.conf.js/,
    /protractor.conf.js/, /test.ts/, /tsconfig.spec.json/,
    /tslint.json/, /favicon.ico/
  ];

  return !toRemoveList.some(re => re.test(path));
}

export default function (options: ApplicationOptions): Rule {
  return (host: Tree, context: SchematicContext) => {


    let split = __dirname.split('/typexs-ng/');
    // TODO use file separator

    let subdirs = __dirname.replace(split[0], '').split('/').length - 2;
    let arr = Array(subdirs).fill('..');

    const txsNgpackageJsonPath = join(__dirname, ...arr, 'package.json');
    let txsNgJson = FileUtils.getJsonSync(txsNgpackageJsonPath);
    options['typexs_ng_version'] = '>=' + txsNgJson.version;
    options['angular_cli_version'] = '^1.7.4';
    options['version'] = '1.7.4';


    let overwrites: any[] = [];
    const virtualRootDir = '/';

    // TODO better is to pass workdir in setOptions
    //let delegator: virtualFs.ScopedHost<{}> = (host.root['_host']).delegate;
    const realRootDir = host['_host']._root;//setOptions['__BASEDIR__'];

    if (!realRootDir) {
      throw new Error('real root dir does not found. ' + realRootDir);
    }

    const packageJsonPath = join(realRootDir, 'package.json');
    const upgradeProject = PlatformUtils.fileExist(packageJsonPath);
    //setOptions.version = '0.0.1';
    if (upgradeProject) {
      let json = FileUtils.getJsonSync(packageJsonPath);
      let basename = PlatformUtils.basename(realRootDir);
      options.name = json.name;
      //setOptions.version = json.version;
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

    //let workspaceSchematic = externalSchematic('@schematics/angular', 'workspace', workspaceOptions);
    let angularSchematic = externalSchematic('@schematics/angular', 'application', options);


    return chain([
      mergeWith(
        apply(empty(),
          [
            angularSchematic,
            (tree: Tree, context: SchematicContext) => {
              return Tree.optimize(tree);
            },
            move(options.prefix, virtualRootDir),
            move(options.directory, virtualRootDir),
            (tree: Tree, context: SchematicContext) => {
              return Tree.optimize(tree);
            },
            (tree: Tree, context: SchematicContext) => {
              tree.visit((path, entry) => {
                if ([/\/src\/app\/(?!modules\/)/].some(r => r.test(path))) {
                  tree.rename(path, path.replace('/src/app/', '/src/modules/app/'));
                } else if ([/\/src\/(?!app)/].some(r => r.test(path))) {
                  tree.rename(path, path.replace('/src/', '/src/app/'));
                }
              });

              let map = {
                '/src/app/tsconfig.app.json': '/tsconfig.app.json',
                '/src/app/tsconfig.spec.json': '/tsconfig.spec.json',
              };

              for (let k in map) {
                if (tree.exists(k)) {
                  tree.rename(k, map[k]);
                }
              }

              return Tree.optimize(tree);
            },
          ])
      ),
      (tree: Tree, context: SchematicContext) => {
        return Tree.optimize(tree);
      },
      mergeWith(
        apply(
          url('./files/creation'),
          [
            options.minimal ? filter(minimalPathFilter) : noop(),
            template({
              utils: strings,
              ...optionsOverwrite,
              'dot': '.',
              sourcedir: optionsOverwrite.sourceDir
            }),
            (tree: Tree, context: SchematicContext) => {
              return Tree.optimize(tree);
            }
          ])
      ),
      (tree: Tree, context: SchematicContext) => {
        return tree;
      },

      mergeWith(
        apply(
          url('./files/overwrite'),
          [
            options.minimal ? filter(minimalPathFilter) : noop(),
            template({
              utils: strings,
              ...optionsOverwrite,
              'dot': '.',
              sourcedir: optionsOverwrite.sourceDir
            }),
            (tree: Tree, context: SchematicContext) => {
              let path = '/package.json';
              let filepath = join(realRootDir, path);
              if (fs.existsSync(filepath) && tree.exists(path)) {

                // add dependencies to package.json
                let local = tree.read(path);
                let jsonNew = JSON.parse(local.toString('utf-8'));
                let json = JSON.parse(fs.readFileSync(filepath).toString('utf-8'));

                let updated = false;
                ['dependencies', 'devDependencies', 'scripts', 'peerDependencies'].forEach(_key => {
                  if (jsonNew[_key]) {

                    if (!json[_key]) {
                      json[_key] = {};
                    }

                    Object.keys(jsonNew[_key]).forEach(_d => {
                      if (!json[_key][_d]) {
                        json[_key][_d] = jsonNew[_key][_d];
                        updated = true;
                      } else {
                        let v_n = semver.clean(jsonNew[_key][_d].replace(/[^\d\.]+/, ''));
                        let v = semver.clean(json[_key][_d].replace(/[^\d\.\-]+/, ''));
                        if (v_n && v && semver.gt(v_n, v)) {
                          // compare versions
                          updated = true;
                          json[_key][_d] = jsonNew[_key][_d];

                        }
                      }
                    });
                  }
                });

                if (updated) {
                  overwrites.push({path: path, content: JSON.stringify(json, null, 2)});
                }
              }

              path = '/gulpfile.ts';
              filepath = join(realRootDir, path);
              if (fs.existsSync(filepath) && tree.exists(path)) {


                let local = tree.read(path);
                let localStr = local.toString('utf-8');
                let exist = fs.readFileSync(filepath).toString('utf-8');

                let newContent = SimpleRegexCodeModifierHelper.copyMethods(exist, localStr);
                newContent = SimpleRegexCodeModifierHelper.copyImports(newContent, localStr);

                if (newContent.length !== exist.length) {
                  overwrites.push({path: path, content: newContent});
                }
              }
              tree = Tree.optimize(tree);
              return tree;
            },

          ]),
        MergeStrategy.Overwrite
      ),
      (tree: Tree, context: SchematicContext) => {
        return tree;
      },

      filter((path: string) => {
        let filepath = join(realRootDir, path);
        return !fs.existsSync(filepath);
      }),

      // filter existing files
      updatePackageJson(),
      //updateWorkspaceFile(angularOptions, workspaceOptions),
      (tree: Tree, context: SchematicContext) => {
        //tree._cacheMap.push
        overwrites.forEach(x => {
          tree['set'](new SimpleFileEntry(x.path, Buffer.alloc(0)));
          tree.overwrite(x.path, x.content);
        });
        return Tree.optimize(tree);
      },
      upgradeProject ? noop() : move(virtualRootDir, options.directory),
    ])(host, context);
  };
}

function updatePackageJson() {
  return (host: Tree, context: SchematicContext) => {
    return host;
  };
}
