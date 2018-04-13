import {join} from 'path';
import {strings, virtualFs} from '@angular-devkit/core';
import * as _ from 'lodash';

import {FileUtils} from 'typexs-base';
import {
  apply,
  asSource, callRule,
  chain,
  externalSchematic, FileSystemTree,
  filter,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext, source,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import {Schema as ApplicationOptions} from './schema';
import * as fs from 'fs';
import {PlatformUtils, SimpleRegexCodeModifierHelper} from "typexs-base";
import {Schema as WorkspaceSchema} from "@schematics/angular/workspace/schema";
import {Schema as ApplicationSchema} from "@schematics/angular/application/schema";
import {merge} from "@angular-devkit/schematics/src/tree/static";


function minimalPathFilter(path: string): boolean {
  const toRemoveList: RegExp[] = [
    /e2e\//, /editorconfig/, /README/, /karma.conf.js/,
    /protractor.conf.js/, /test.ts/, /tsconfig.spec.json/,
    /tslint.json/, /favicon.ico/
  ];

  return !toRemoveList.some(re => re.test(path));
}


function cleanupFilter(path: string): boolean {
  const toRemoveList: RegExp[] = [
    /README\.md/,
    /karma\.conf\.js/,
    /\.angular-cli\.json/,
    /package\.json/,
    /protractor\.conf\.js/,
    /tsconfig\.(app|spec)\.json/,
    /styles\./,
    /app\.module\.ts/,
    /main\.ts/
  ];
  return toRemoveList.some(re => re.test(path));
}

export default function (options: ApplicationOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const txsNgpackageJsonPath = join(__dirname, '..', '..', '..', '..', '..', 'package.json');
    let txsNgJson = FileUtils.getJsonSync(txsNgpackageJsonPath);
    options['typexs_ng_version'] = ">=" + txsNgJson.version;
    options['angular_cli_version'] = ">=1.7.4";
    options['version'] = options['angular_cli_version'];

    let overwrites: any[] = [];
    const virtualRootDir = '/';

    // TODO better is to pass workdir in options
    // let delegator: virtualFs.ScopedHost<{}> = (host.root['_host']).delegate;
    const realRootDir = options['__BASEDIR__'];

    if (!realRootDir) {
      throw new Error('real root dir does not found. ' + realRootDir)
    }

    const packageJsonPath = join(realRootDir, 'package.json')
    const upgradeProject = PlatformUtils.fileExist(packageJsonPath);

    if (upgradeProject) {
      let json = FileUtils.getJsonSync(packageJsonPath);
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

    let workspaceOptions: WorkspaceSchema = {
      name: options.name,
      newProjectRoot: options.workdir,
      skipGit: options.skipGit,
      skipInstall: options.skipInstall,
      version: options.version,
      //commit: null,
      linkCli: false

      // linkCli:
    }

    let angularOptions: ApplicationSchema = {
      name: options.name,
      viewEncapsulation: options.viewEncapsulation,
      inlineStyle: options.inlineStyle,
      prefix: options.prefix,
      inlineTemplate: options.inlineTemplate,
      projectRoot: options.workdir,
      routing: options.routing,
      skipPackageJson: false,
      skipTests: options.skipTests,
      style: options.style,

    }
    // disable module generation in ext. schematic @schematics/angular
    // options['module'] = false;

    let optionsOverwrite = _.clone(options);
    optionsOverwrite.sourceDir = 'src/app';
    optionsOverwrite.appmoduledir = 'src/modules/app';

    let workspaceSchematic = externalSchematic('@schematics/angular', 'workspace', workspaceOptions);
    let angularSchematic = externalSchematic('@schematics/angular', 'application', angularOptions);

    // TODO check if schematics exists ...

    return chain([
      mergeWith(
        asSource(
          chain([
            workspaceSchematic,
            angularSchematic,
            (tree: Tree, context: SchematicContext) => {
              return Tree.optimize(tree);
            },
            move(options.prefix, virtualRootDir),
            upgradeProject ? move(options.directory, virtualRootDir) : noop(),
            (tree: Tree, context: SchematicContext) => {
              return Tree.optimize(tree);
            },
//            filter(cleanupFilter),
            (tree: Tree, context: SchematicContext) => {
              tree.visit((path, entry) => {
                // let _path = join(realRootDir,path);
                // if (cleanupFilter(path) || fs.existsSync(_path)) {
                //   tree.delete(path);
                if ([/\/src\/app\/(?!modules\/)/].some(r => r.test(path))) {
                  tree.rename(path, path.replace('/src/app/', '/src/modules/app/'));
                } else if ([/\/src\/(?!app)/].some(r => r.test(path))) {
                  tree.rename(path, path.replace('/src/', '/src/app/'));
                }
              });
              return Tree.optimize(tree);
            },

            filter((path: string) => {
              let filepath = join(realRootDir, path);
              return !fs.existsSync(filepath);
            }),
/*
            (tree: Tree, context: SchematicContext) => {
              return Tree.optimize(tree);
            },
            */
          ])
        )
      ),
      // mergeWith(asSource()),
      (tree: Tree, context: SchematicContext) => {
        return tree;
      },
      mergeWith(
        apply(
          url('./files'),
          [
            options.minimal ? filter(minimalPathFilter) : noop(),
            template({
              utils: strings,
              ...optionsOverwrite,
              'dot': '.',
              sourcedir: optionsOverwrite.sourceDir
            }),
            (tree: Tree, context: SchematicContext) => {

              return tree;
            },
            /*
            filter((path: string) => {
              let filepath = join(realRootDir, path);
              let exists = fs.existsSync(filepath);
              return exists;
            }),
            */
            (tree: Tree, context: SchematicContext) => {
              return tree;
            },
            /*
            (tree: Tree, context: SchematicContext) => {
              tree.visit((path: string, entry) => {
                let filepath = join(realRootDir, path);
                if (fs.existsSync(filepath)) {

                  // add dependencies to package.json
                  if (/package\.json/.test(path)) {
                    let local = tree.read(path);
                    let jsonNew = JSON.parse(local.toString('utf-8'));
                    let json = JSON.parse(fs.readFileSync(filepath).toString('utf-8'));

                    let updated = false;
                    ['dependencies', 'devDependencies', 'scripts', 'peerDependencies'].forEach(_key => {
                      if (jsonNew[_key]) {

                        if (!json[_key]) {
                          json[_key] = {}
                        }

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

                  // tree.delete(path);
                }
              });

              tree = Tree.optimize(tree);
              return tree;
            },
            upgradeProject ? noop() : move(options.directory),
            */
          ]),
        MergeStrategy.Overwrite
      ),
      (tree: Tree, context: SchematicContext) => {
        overwrites.forEach(x => {
          tree.overwrite(x.path, x.content)
        })
        return tree;
      }
    ])(host, context);
  };
}
