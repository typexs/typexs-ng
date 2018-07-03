import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// Theme initialization
import {THEMES} from './themes';
import {STYLES} from './stylesheets';
import {ThemeRegistry} from '../libs/angular/ThemeRegistry';
ThemeRegistry.register(THEMES, STYLES);

import {AppModule} from './../modules/app/app.module';
import {environment} from './environments/environment';
// import {FORM_ELEMENTS} from '../libs/form/elements';


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

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
