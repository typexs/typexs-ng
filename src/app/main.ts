import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// Theme initialization
import {THEMES} from './themes';
import {ThemeRegistry} from "../libs/angular/ThemeRegistry";
ThemeRegistry.register(THEMES);

import {AppModule} from './../modules/app/app.module';
import {environment} from './environments/environment';
import {enableProdMode} from "@angular/core";

if (environment.production) {
  enableProdMode();
}


// TODO theme selection of themes which are enabled in local and thrid party packages.
/**
 * themes must be defined under src/app/themes
 * - use require for fetching the theme files, so this can be translated in p
 * - define enables themes in config/typexs
 * -
 */


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
